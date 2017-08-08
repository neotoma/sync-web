import Ember from 'ember';
import config from '../config/environment';

export default Ember.Mixin.create({
  componentEvents: Ember.inject.service(),
  appNav: Ember.inject.service(),

  activate: function() {
    Ember.run.next(this, () => {
      Ember.$(window).scrollTop(this.getLastScroll());
      this.get('appNav').show();
    });
  },

  afterModel: function() {
    Ember.run.later(this, () => {
      Ember.$(window).scrollTop(this.getLastScroll());
    }, 50);
  },

  getLastScroll: function() {
    if (this.get('id')) {
      let lastScrollValues = this.get('lastScrollValues') ? this.get('lastScrollValues') : {};
      return lastScrollValues[this.get('id')] ? lastScrollValues[this.get('id')] : 0;
    } else {
      return this.get('lastScroll') ? this.get('lastScroll') : 0;
    }
  },

  setLastScroll: function() {
    if (this.get('id')) {
      let lastScrollValues = this.get('lastScrollValues') ? this.get('lastScrollValues') : {};
      lastScrollValues[this.get('id')] = Ember.$(window).scrollTop();
      this.set('lastScrollValues', lastScrollValues);
    } else {
      this.set('lastScroll', Ember.$(window).scrollTop());
    }
  },

  actions: {
    willTransition: function(transition) {
      this._super.apply(this, arguments);

      if (this.get('routeName') === 'application') {
        return true;
      }

      if (this.get('transitionDelayed')) {
        this.set('transitionDelayed', false);
        return true;
      } else {
        transition.abort();
        this.set('transitionDelayed', true);
        this.setLastScroll('lastScroll', Ember.$(window).scrollTop());

        this.get('componentEvents').hideAll();

        Ember.run.later(transition, function() {
          transition.retry();
        }, config.transitionDelay);
      }
    }
  }
});
