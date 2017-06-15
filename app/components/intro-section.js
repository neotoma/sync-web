import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['intro'],

  init() {
    this._super(...arguments);
    
    Ember.run.next(() => {
      this.set('loaded', true);
    });
  },
});