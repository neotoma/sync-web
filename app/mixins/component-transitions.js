import Ember from 'ember';
import config from '../config/environment';

export default Ember.Mixin.create({
  classNameBindings: ['loaded', 'reloading', 'hidden', 'error', 'empty'],
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
    this.set('reloading', true);

    Ember.run.later(() => {
      new Promise(executor).then(() => {
        if (!this.get('isDestroyed')) {
          this.set('reloading', false);
        }
      }).catch(() => {
        if (!this.get('isDestroyed')) {
          this.set('reloading', false);
        }

        this.set('error', true);
      });
    }, config.transitionDelay);
  }
});
