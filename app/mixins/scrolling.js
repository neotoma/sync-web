import Ember from 'ember';

export default Ember.Mixin.create({
  bindScrolling() {
    var onScroll = () => {
      return this.onScroll();
    };

    var onScrollDebounce = () => {
      Ember.run.debounce(this, onScroll, 50);
    };

    Ember.$(document).bind('touchmove', onScrollDebounce);
    Ember.$(window).bind('scroll', onScrollDebounce);
  }
});
