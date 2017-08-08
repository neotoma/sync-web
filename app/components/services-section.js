import Ember from 'ember';
import {pluralize} from 'ember-inflector';

export default Ember.Component.extend({
  classNameBindings: ['hasServices:loaded'],
  sortedProperties: ['name:asc'],
  sortedServices: Ember.computed.sort('services', 'sortedProperties'),
  store: Ember.inject.service(),
  sessionsService: Ember.inject.service('sessions'),
  tagName: 'section',

  init() {
    this._super(...arguments);
    this.set('classNames', [this.get('pluralModelName')]);
    this.set('services', this.get('sessionsService').get(pluralize(this.get('modelName'))));
  },

  hasServices: Ember.computed('services.[]', function() {
    return (this.get('services.length'));
  }),

  pluralModelName: Ember.computed('modelName', function() {
    return pluralize(this.get('modelName'));
  })
});