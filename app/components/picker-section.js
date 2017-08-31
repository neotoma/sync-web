import Ember from 'ember';

export default Ember.Component.extend({
  cart: Ember.inject.service(),
  classNames: ['picker'],
  routing: Ember.inject.service('-routing'),
  sortedServicesProperties: ['name:asc'],
  sortedServices: Ember.computed.sort('services', 'sortedServicesProperties'),
  store: Ember.inject.service(),
  tagName: 'section',

  init() {
    this._super(...arguments);

    this.get('store').findAll(this.get('modelName')).then((services) => {
      this.set('services', services);

      this.get('cart').loadServices(this.get('modelName')).then(() => {
        Ember.run.next(() => {
          this.set('loaded', true);
        });
      });
    }).catch((error) => {
      this.handleError(error);
    });
  },

  selectedServices: Ember.computed('services.@each.isSelected', function() {
    var selectedServices = [];

    if (!this.get('services')) {
      return selectedServices;
    }

    this.get('services').forEach((service) => {
      if (service.get('isSelected')) {
        selectedServices.push(service);
      }
    });

    return selectedServices;
  }),

  hasSelected: Ember.computed('services.@each.isSelected', function() {
    return this.get('selectedServices.length') > 0;
  }),

  properties: Ember.computed('modelName', 'selectedServices.[]', function() {
    return {
      modelName: this.get('modelName'),
      selectedNames: this.get('selectedServices').map((service) => service.get('name')),
      selectedObjects: this.get('selectedServices').map((service) => service.get('id'))
    };
  }),

  actions: {
    submit: function() {
      this.get('cart').addServices(this.get('selectedServices'));
      this.get('routing').transitionTo(this.get('submitRoute'));
    }
  }
});
