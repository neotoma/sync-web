import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  email: DS.attr('string'),
  name: DS.attr('string'),
  userSourceAuths: DS.hasMany('userSourceAuths'),
  userStorageAuths: DS.hasMany('userStorageAuths'),

  hasSourceAuth: Ember.computed('userSourceAuths.[]', function() {
    return (this.get('userSourceAuths.length'));
  }),

  hasStorageAuth: Ember.computed('userStorageAuths.[]', function() {
    return (this.get('userStorageAuths.length'));
  })
});