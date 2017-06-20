import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['notice'],

  init() {
    this._super(...arguments);

    Ember.run.next(() => {
      this.set('loaded', true);
    });
  },

  hasButton: Ember.computed('buttonLabel', 'buttonAction', function() {
    return (this.get('buttonLabel') && this.get('buttonAction'));
  })
});
