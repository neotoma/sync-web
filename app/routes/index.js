import Ember from 'ember';

export default Ember.Route.extend({
  sessionsService: Ember.inject.service('sessions'),

  model() {
    return Promise.all([
      this.get('sessionsService.jobs'),
      this.get('sessionsService.userSourceAuths'),
      this.get('sessionsService.userStorageAuths')
    ]);
  },

  actions: {
    viewStoragesPicker() {
      this.transitionTo('storages-picker');
    }
  }
});