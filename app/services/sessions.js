import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  userAuthModelNames: {
    source: 'userSourceAuth',
    storage: 'userStorageAuth'
  },

  loadSessions: function() {
    return new Promise((resolve, reject) => {
      this.get('store').findAll('session', { include: 'users,userSourceAuths,userStorageAuths' }).then((sessions) => {
        this.set('sessions', sessions);
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  },

  user: Ember.computed('sessions.firstObject.users.firstObject', function() {
    return this.get('sessions.firstObject.users.firstObject');
  }),

  userAuths(modelName) {
    return new Promise((resolve, reject) => {
      if (!this.get('user.id')) {
        return resolve();
      }

      var userAuthModelName = this.get('userAuthModelNames')[modelName];

      var filter = {
        relationships: {
          user: {
            id: this.get('user.id'),
            type: 'users'
          }
        }
      };

      this.get('store').query(userAuthModelName, {
        filter: filter
      }).then((userAuths) => {
        resolve(userAuths);
      }).catch(reject);
    });
  },

  /**
   * Indicates whether session user has at least one associated authentication object
   */
  hasUserAuth() {
    return new Promise((resolve, reject) => {
      if (!this.get('user')) { return resolve(false); }
      
      Promise.all([
        this.userAuths('source'),
        this.userAuths('storage')
      ]).then((userAuthCollections) => {
        userAuthCollections.forEach((userAuths) => {
          if (userAuths.get('length')) {
            return resolve(true);
          }
        });

        resolve(false);
      }).catch(reject);
    });
  },

  /**
   * Indicates whether session user has at least one associated authentication object per type of auth
   */
  hasBothUserAuth() {
    return new Promise((resolve, reject) => {
      if (!this.get('user')) { return resolve(false); }
      
      Promise.all([
        this.userAuths('source'),
        this.userAuths('storage')
      ]).then((userAuthCollections) => {
        if (userAuthCollections[0].get('length') && userAuthCollections[1].get('length')) {
          return resolve(true);
        }

        resolve(false);
      }).catch(reject);
    });
  },

  /**
   * Indicates whether session user has associated authenticated object for given service
   */
  hasUserServiceAuth(service) {
    return new Promise((resolve, reject) => {
      this.userAuths(service.constructor.modelName).then((userAuths) => {
        userAuths.forEach((userAuth) => {
          if (userAuth.get(service.constructor.modelName).get('id') === service.get('id')) {
            return resolve(true);
          }
        });

        resolve(false);
      }).catch(reject);
    });
  }
});