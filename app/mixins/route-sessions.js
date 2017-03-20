import Ember from 'ember';

export default Ember.Mixin.create({
  sessionsService: Ember.inject.service('sessions'),

  beforeModel: function() {
    return new Promise((resolve, reject) => {
      this.get('sessionsService').loadSessions().then(() => {
        if (this.get('sessionUserRequired') && !this.get('sessionsService.user')) {
          this.transitionTo('index');
        }

        if (this.get('sessionUserRedirect') && this.get('sessionsService.user')) {
          this.transitionTo(this.get('sessionUserRedirect'));
        }

        if (this.get('sessionUserPropertyRedirect') && this.get('sessionsService.user')) {
          var parts = this.get('sessionUserPropertyRedirect').split(':');
          var property = parts[0];
          var route = parts[1];

          if (
            (property.charAt(0) === '!' && !this.get('sessionsService.user').get(property.substring(1))) || 
            (property.charAt(0) !== '!' && this.get('sessionsService.user').get(property))) {
            this.transitionTo(route);
          }
        }

        resolve();
      }).catch(reject);
    });
  },

  setupController(controller, model) {
    controller.set('sessionUser', this.get('sessionsService.user'));
  }
});