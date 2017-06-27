import Ember from 'ember';
import ScrollingMixin from '../mixins/scrolling';
import ImagesLoaded from 'npm:imagesloaded';

export default Ember.Component.extend(ScrollingMixin, {
  appNav: Ember.inject.service(),
  classNames: ['app'],
  classNameBindings: ['scrolled', 'shown', 'collapsed'],
  store: Ember.inject.service(),
  tagName: 'nav',

  init() {
    this._super(...arguments);

    this.get('store').findRecord('attribute', 'logoUrl').then((logoUrl) => {
      this.set('logoUrl', logoUrl.get('value'));

      ImagesLoaded(this.get('element'), () => {
        this.set('loaded', true);
      });
    }).catch((error) => {
      this.handleError(error);
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
