import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isPending:pending'],
  classNames: ['item'],
  tagName: 'div',

  init() {
    this._super(...arguments);

    Ember.run.next(() => {
      this.set('loaded', true);
    });
  },

  isPending: Ember.computed('item.storageVerifiedAt', function() {
    return !this.get('item.storageVerifiedAt');
  })
});
