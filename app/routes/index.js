import Ember from 'ember';

export default Ember.Route.extend({
  sessions: Ember.inject.service(),

  model() {
    return this.get('sessions').hasBothUserAuth();
  },

  setupController(controller, hasBothUserAuth) {
    controller.set('hasUserAuth', hasBothUserAuth);
    controller.set('sessions', this.get('sessions'));
  }
});