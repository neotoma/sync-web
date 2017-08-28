import Ember from 'ember';
import wf from 'sync-web/utils/waterfall';

export default Ember.Component.extend({
  cart: Ember.inject.service(),
  classNames: ['cart'],
  routing: Ember.inject.service('-routing'),
  sessions: Ember.inject.service(),
  store: Ember.inject.service(),
  tagName: 'section',

  init() {
    this._super(...arguments);

    wf([ () => {
        return this.get('cart').loadAllServices();
      }, () => {
        this.considerTransition();
      }, () => {
        this.set('loaded', true);
      }
    ]);
  },

  considerTransition() {
    if (!this.get('cart.services.length')) {
      this.get('routing').transitionTo('index');
    }
  },

  enabledServiceProperties: Ember.computed('cart.enabledService', function() {
    return {
      service: this.get('cart.enabledService.id'),
      serviceModelName: this.get('cart.enabledService.constructor.modelName'),
      serviceName: this.get('cart.enabledService.name')
    };
  }),

  actions: {
    createNotificationRequests: function() {
      if (!this.get('email') && !this.get('sessions.user')) { return; }

      this.get('segment').trackEvent('Requested notification of "Item storage enabled" for services', {
        email: this.get('email'),
        services: this.get('cart.services').map((service) => service.get('id')),
        serviceModelNames: this.get('cart.services').map((service) => service.constructor.modelName),
        serviceNames: this.get('cart.services').map((service) => service.get('name'))
      });

      this.transitionPromise((resolve, reject) => {
        if (this.get('sessions.user')) {
          return this.get('cart').createNotificationRequests().then(() => {
            this.considerTransition();
            resolve();
          }).catch(reject);
        }

        var createNotificationRequests = [];

        this.get('cart.services').forEach((service) => {
          var request = {
            event: 'Item storage enabled'
          };

          request[service.constructor.modelName] = service.get('id');
          createNotificationRequests.push(request);
        });

        this.get('store').createRecord('contactVerificationRequest', {
          authenticateSession: true,
          clientOrigin: window.location.origin,
          contact: this.get('email'),
          createNotificationRequests: createNotificationRequests,
          createUser: true,
          method: 'email',
          session: this.get('sessions.sessions.firstObject.id')
        }).save().then(() => {
          return this.get('cart').removeAllServices();
        }).then(() => {
          this.get('routing').transitionTo('contact-verification-requests');
          resolve();
        }).catch(reject);
      });
    },

    declineNotificationRequests: function() {
      this.get('segment').trackEvent('Declined notification of "Item storage enabled" for services', {
        services: this.get('cart.services').map((service) => service.get('id')),
        serviceModelNames: this.get('cart.services').map((service) => service.constructor.modelName),
        serviceNames: this.get('cart.services').map((service) => service.get('name'))
      });

      this.set('cart.declinedNotificationRequests', true);

      this.transitionPromise((resolve) => {
        this.get('cart').removeAllServices();
        this.considerTransition();
        resolve();
      });
    },

    skipService: function(service) {
      this.get('segment').trackEvent('Skipped service auth', this.get('enabledServiceProperties'));

      this.transitionPromise((resolve) => {
        this.get('cart').removeService(service);
        this.considerTransition();
        resolve();
      });
    }
  }
});
