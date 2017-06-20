import Ember from 'ember';

export default Ember.Route.extend({
  cart: Ember.inject.service(),
  sessionsService: Ember.inject.service('sessions'),

  model() {
    return Promise.all([
      this.get('sessionsService').hasBothUserAuth(),
      this.get('sessionsService').hasUnverifiedContactVerificationRequest(),
      this.get('sessionsService').hasNotificationRequest()
    ]);
  },

  setupController(controller, model) {
    controller.set('hasBothUserAuth', model[0]);
    controller.set('hasUnverifiedContactVerificationRequest', model[1]);
    controller.set('hasNotificationRequest', model[2]);
  },

  actions: {
    viewStoragesPicker() {
      this.transitionTo('storages-picker');
    }
  }
});