import Ember from 'ember';

export default Ember.Route.extend({
  segment: Ember.inject.service(),
  sessionsService: Ember.inject.service('sessions'),

  beforeModel: function() {
    return this.get('sessionsService.sessions');
  },

  identifyUser: function() {
    if (this.get('sessionsService.user')) {
      this.get('segment').aliasUser(this.get('sessionsService.user.id'), this.get('sessionsService.session.id'));

      this.get('segment').identifyUser(this.get('sessionsService.user.id'), {
        email: this.get('sessionsService.user.email'),
        name: this.get('sessionsService.user.name')
      });
    } else {
      this.get('segment').identifyUser(undefined, undefined, {
        anonymousId: this.get('sessionsService.session.id')
      });
    }
  }
});