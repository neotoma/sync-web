import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['notice'],

  init(loaded) {
    this._super(...arguments);

    if (loaded !== false) {
      Ember.run.next(() => {
        this.set('loaded', true);
      });
    }
  },

  hasButton: Ember.computed('buttonLabel', 'buttonAction', function() {
    return (this.get('buttonLabel') && this.get('buttonAction'));
  }),

  hasRouteButton: Ember.computed('buttonLabel', 'buttonRouteAction', function() {
    return (this.get('buttonLabel') && this.get('buttonRouteAction'));
  })
});
