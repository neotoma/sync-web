import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['hasSortedItems:loaded'],
  classNames: ['items'],
  socket: Ember.inject.service(),
  sortedProperties: ['storageVerifiedAt:desc'],
  sortedItems: Ember.computed.sort('storedItems', 'sortedProperties'),
  store: Ember.inject.service(),
  sessions: Ember.inject.service(),
  tagName: 'section',

  init() {
    this._super(...arguments);
    this.set('items', this.get('store').findAll('item'));
  },

  limitedStoredItems: Ember.computed('sortedItems', function() {
    return this.get('sortedItems').slice(0, 50);
  }),

  storedItems: Ember.computed('items.@each', function() {
    return this.get('items').filter((item) => (item.get('storageVerifiedAt')));
  }),

  hasSortedItems: Ember.computed('storedItems.[]', function() {
    return (this.get('storedItems.length'));
  })
});
