import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  cart: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),
  sessions: Ember.inject.service(),
  store: Ember.inject.service(),
  classNames: ['cart'],

  willRender() {
    this._super(...arguments);

    this.get('cart').loadAllServices().then(() => {
      this.considerTransition();
      this.set('loaded', true);
    });
  },

  considerTransition() {
    if (!this.get('cart.services.length') && !this.get('isConsideringTransition')) {
      this.set('isConsideringTransition', true);

      this.get('sessions').hasUserAuth().then((hasUserAuth) => {
        if (hasUserAuth) {
          this.get('store').query('job', {
            filter: {
              relationships: {
                user: {
                  id: this.get('sessions.user.id'),
                  type: 'users'
                }
              }
            }
          }).then((jobs) => {
            if (!jobs.get('length')) {
              this.createJobs();
            }

            this.transition();
          });
        } else {
          this.transition();
        }
      });
    }
  },

  createJobs() {
    this.get('sessions').userAuths('storage').then((userStorageAuths) => {
      userStorageAuths.forEach((userStorageAuth) => {
        this.get('sessions').userAuths('source').then((userSourceAuths) => {
          userSourceAuths.forEach((userSourceAuth) => {
            this.get('store').createRecord('job', {
              name: 'storeAllItemsForUserStorageSource',
              source: userSourceAuth.get('source'),
              user: this.get('sessions.user'),
              storage: userStorageAuth.get('storage')
            }).save();
          });
        });
      });
    });
  },

  transition() {
    this.get('routing').transitionTo('index');
    this.set('isConsideringTransition', false);
  },

  actions: {
    createNotificationRequests: function() {
      if (!this.get('email') && !this.get('sessions.user')) { return; }

      return new Promise((resolve, reject) => {
        this.transitionPromise(() => {
          if (!this.get('sessions.user')) {
            this.get('store').createRecord('contactVerificationRequest', {
              authenticateSession: true,
              clientOrigin: window.location.origin,
              contact: this.get('email'),
              createUser: true,
              method: 'email',
              session: this.get('sessions.sessions.firstObject.id')
            }).save().then((contactVerificationRequest) => {
              this.get('cart').removeAllServices().then(() => {
                resolve();
              }).catch(reject);
            });
          } else {
            this.get('cart').createNotificationRequests().then(() => {
              this.considerTransition();
              resolve();
            }).catch(reject);
          }
        });
      });
    },

    declineNotificationRequests: function() {
      this.set('cart.declinedNotificationRequests', true);

      this.transitionPromise(() => {
        return this.get('cart').removeAllServices();
      });
    }
  }
});
