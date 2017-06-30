import Ember from 'ember';
import config from '../config/environment';

export default Ember.Mixin.create({
  classNameBindings: ['loaded', 'hidden', 'error', 'empty'],
  tagName: 'div',

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
    }, config.transitionDelay);
  }
});
