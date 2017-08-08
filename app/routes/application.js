import Ember from 'ember';

export default Ember.Route.extend({
  sessionsService: Ember.inject.service('sessions'),

  beforeModel: function() {
    return this.get('sessionsService.sessions');
  }
});