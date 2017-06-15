import Ember from 'ember';
import {pluralize} from 'ember-inflector';

export default Ember.Component.extend({
  classNameBindings: ['hasServices:loaded'],
  sortedProperties: ['name:asc'],
  sortedServices: Ember.computed.sort('services', 'sortedProperties'),
  store: Ember.inject.service(),
  sessions: Ember.inject.service(),
  tagName: 'section',

  init() {
    this._super(...arguments);

    this.set('classNames', [this.get('pluralModelName')]);

    this.get('sessions').userAuths(this.get('modelName')).then((userAuths) => {
      this.set('services', userAuths.map((userAuth) => userAuth.get(this.get('modelName'))));
    }).catch((error) => {
      this.handleError(error);
    });
  },

  hasServices: Ember.computed('services.[]', function() {
    return (this.get('services.length'));
  }),

  pluralModelName: Ember.computed('modelName', function() {
    return pluralize(this.get('modelName'));
  })
});