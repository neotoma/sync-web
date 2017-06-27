import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

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

      var userAuthModelNames = {
        source: 'userSourceAuth',
        storage: 'userStorageAuth'
      };

      this.get('store').query(userAuthModelNames[modelName], {
        filter: {
          relationships: {
            user: {
              id: this.get('user.id'),
              type: 'users'
            }
          }
        }
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
        return resolve((userAuthCollections[0].get('length') && userAuthCollections[1].get('length')));
      }).catch(reject);
    });
  },

  /**
   * Indicates whether session has at least one contactVerificationRequest object
   */
  hasUnverifiedContactVerificationRequest() {
    return new Promise((resolve, reject) => {
      if (!this.get('user')) { return resolve(false); }
      
      this.get('store').query('contactVerificationRequest', {
        filter: {
          attributes: {
            verified: false
          }
        }
      }).then((contactVerificationRequests) => {
        resolve((contactVerificationRequests.get('length')));
      }).catch(reject);
    });
  },

  /**
   * Indicates whether session user has at least one notificationRequest object
   */
  hasNotificationRequest() {
    return new Promise((resolve, reject) => {
      if (!this.get('user')) { return resolve(false); }

      this.get('store').query('notificationRequest', {
        filter: {
          relationships: {
            user: {
              id: this.get('user.id'),
              type: 'users'
            }
          }
        }
      }).then((notificationRequests) => {
        resolve((notificationRequests.get('length')));
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
