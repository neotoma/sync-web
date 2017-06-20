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
            if (jobs.get('length') === 0) {
              this.createJobs();
            }

            this.get('routing').transitionTo('index');
            this.set('isConsideringTransition', false);
          });
        } else {
          this.set('isConsideringTransition', false);
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

  actions: {
    createNotificationRequests: function() {
      return new Promise((resolve, reject) => {
        this.transitionPromise(() => {
          if (this.get('email')) {
            this.get('cart').removeAllServices().then(() => {
              this.set('sessions.createdNotificationRequests', true);
              resolve();
            }).catch(reject);
          } else {
            this.get('cart').createNotificationRequests().then(() => {
              this.set('sessions.createdNotificationRequests', true);
              this.considerTransition();
              resolve();
            }).catch(reject);
          }
        });
      });
    },

    removeAllServices: function() {
      this.transitionPromise(() => {
        this.set('sessions.noCreatedNotificationRequests', true);
        return this.get('cart').removeAllServices();
      });
    }
  }
});
