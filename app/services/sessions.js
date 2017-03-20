import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  loadSessions: function() {
    return new Promise((resolve, reject) => {
      this.get('store').findAll('session', { include: 'users' }).then((sessions) => {
        this.set('sessions', sessions);
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  },

  user: Ember.computed('sessions.firstObject.users.firstObject', function() {
    return this.get('sessions.firstObject.users.firstObject');
  })
});