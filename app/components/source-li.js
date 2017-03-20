import Ember from 'ember';

export default Ember.Component.extend({
  sessionsService: Ember.inject.service('sessions'),
  store: Ember.inject.service(),
  tagName: 'li',

  actions: {
    deleteUserSourceAuth: function() {
      this.get('sessionUserSourceAuth').destroyRecord();
    },

    storeAllItems: function() {
      this.get('store').createRecord('job', {
        name: 'storeAllItemsForUserStorageSource',
        source: this.get('source'),
        storage: this.get('sessionsService.user.userStorageAuths.firstObject.storage'),
        user: this.get('sessionsService.user')
      }).save();
    }
  },

  sessionUserSourceAuth: Ember.computed('sessionsService.user.userSourceAuths.[]', function() {
    return this.get('sessionsService.user.userSourceAuths').find((userSourceAuth) => {
      return (userSourceAuth.get('source.id') === this.get('source.id'));
    });
  }),

  sessionUserHasSourceAuth: Ember.computed('sessionUserSourceAuth', function() {
    return (this.get('sessionUserSourceAuth'));
  })
});