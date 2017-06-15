import Ember from 'ember';

export default Ember.Mixin.create({
  classNameBindings: ['loaded', 'hidden', 'error', 'empty'],
  tagName: 'div',
  transitionDelay: window.EmberENV.transitionDelay,

  handleError(error) {
    console.error(error.message);
    this.set('error', true);
  },

  notLoaded: Ember.computed('loaded', function() {
    return !this.get('loaded');
  }),

  /**
   * Unload component and reload once promise fulfilled
   * @param {function} executor
   */
  transitionPromise(executor) {
    this.set('loaded', false);

    Ember.run.later(() => {
      new Promise(executor).then(() => {
        this.set('loaded', true);
      }).catch(() => {
        this.set('error', true);
      });
    }, this.get('transitionDelay'));
  }
});
