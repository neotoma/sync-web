import Ember from 'ember';
import {pluralize} from 'ember-inflector';

export default Ember.Service.extend({
  localStorage: localStorage,
  sessions: Ember.inject.service(),
  sources: [],
  storages: [],
  store: Ember.inject.service(),

  addService(service) {
    var services = this.get(pluralize(service.constructor.modelName));
    if (!services.includes(service)) {
      services.pushObject(service);
      this.updateLocalStorage();
    }
  },

  addServices(services) {
    services.forEach((service) => {
      this.addService(service);
    });
  },

  removeAllServices() {
    this.set('sources', []);
    this.set('storages', []);
    this.updateLocalStorage();
  },

  removeService(service) {
    this.get(pluralize(service.constructor.modelName)).removeObject(service);
    this.updateLocalStorage();
  },

  pruneAllServices() {
    return Promise.all([
      this.pruneServices('source'),
      this.pruneServices('storage')
    ]);
  },

  pruneServices(modelName) {
    if (!this.get('sessions.user')) { return Promise.resolve(); }

    var promises = [];

    this.get(pluralize(modelName)).forEach((service) => {
      var promise = this.get('sessions').hasUserServiceAuth(service).then((isAuthed) => {
        if (isAuthed) {
          return this.removeService(service);
        }
      });

      promises.push(promise);
    });

    return Promise.all(promises);
  },

  updateLocalStorage() {
    ['sources', 'storages'].forEach((pluralModelId) => {
      this.get('localStorage').setItem(pluralModelId, JSON.stringify(this.get(pluralModelId).map((service) => service.get('id'))));
    });
  },

  loadAllServices() {
    return Promise.all([
      this.loadServices('source'),
      this.loadServices('storage')
    ]).then(() => { return this.pruneAllServices(); });
  },

  loadServices(modelName) {
    if (!this.get('localStorage').getItem(pluralize(modelName))) { return Promise.resolve(); }

    var promises = [];

    JSON.parse(this.get('localStorage').getItem(pluralize(modelName))).forEach((id) => {
      var promise = this.get('store').findRecord(modelName, id).then((service) => {
        service.set('isSelected', true);
        this.addService(service);
        return service;
      }).catch((error) => {
        console.error(`Unable to load ${modelName} record from localStorage`, error);
      });

      promises.push(promise);
    });

    return Promise.all(promises);
  },

  createNotificationRequests() {
    return Promise.all(this.get('disabledServices').map((service) => {
      var attributes = {
        event: 'Item storage enabled',
        user: this.get('sessions.user')
      };

      attributes[service.constructor.modelName] = service;

      return this.get('store').createRecord('notificationRequest', attributes).save();
    })).then(() => {
      return this.removeAllServices();
    });
  },

  services: Ember.computed('sources.[],storages.[]', function() {
    var services = [];

    this.get('sources').forEach((source) => {
      services.pushObject(source);
    });

    this.get('storages').forEach((storage) => {
      services.pushObject(storage);
    });

    return services;
  }),

  disabledService: Ember.computed('disabledServices.[]', function() {
    return this.get('disabledServices.firstObject');
  }),

  disabledServices: Ember.computed('services.[]', function() {
    return this.get('services').filter((service) => {
      return !(service.get('itemStorageEnabled'));
    });
  }),

  hasDisabledService: Ember.computed('disabledServices.firstObject', function() {
    return (this.get('disabledServices.length'));
  }),

  hasOneDisabledService: Ember.computed('disabledServices.firstObject', function() {
    return (this.get('disabledServices.length') === 1);
  }),

  enabledService: Ember.computed('enabledServices.[]', function() {
    return this.get('enabledServices.firstObject');
  }),

  enabledServices: Ember.computed('services.[]', function() {
    return this.get('services').filter((service) => {
      return (service.get('itemStorageEnabled'));
    }).sort((a, b) => {
      if (a.constructor.modelName === 'source' && b.constructor.modelName === 'storage') {
        return 1;
      } else {
        return -1;
      }
    });
  }),

  hasEnabledService: Ember.computed('enabledServices.firstObject', function() {
    return (this.get('enabledServices.firstObject'));
  })
});
