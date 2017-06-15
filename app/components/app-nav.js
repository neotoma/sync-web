import Ember from 'ember';
import ScrollingMixin from '../mixins/scrolling';

export default Ember.Component.extend(ScrollingMixin, {
  appNav: Ember.inject.service(),
  classNames: ['app'],
  classNameBindings: ['scrolled', 'shown', 'collapsed'],
  tagName: 'nav',

  init() {
    this._super(...arguments);

    this.get('appNav').on('show', () => {
      this.set('loaded', true);
    });
  },

  collapsed: Ember.computed('appNav.collapsed', function() {
    return this.get('appNav.collapsed');
  }),

  onScroll() {
    this.set('scrolled', (Ember.$(document).scrollTop() > 0));
  },

  didInsertElement() {
    this.bindScrolling();
  }
});
