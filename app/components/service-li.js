import Ember from 'ember';
import {pluralize} from 'ember-inflector';

export default Ember.Component.extend({
  classNames: ['loaded'],
  sortedProperties: ['createdAt:desc'],
  sortedJobs: Ember.computed.sort('serviceJobs', 'sortedProperties'),
  store: Ember.inject.service(),
  tagName: 'li',

  init() {
    this._super(...arguments);
    this.get('classNames').pushObject(this.get('modelName'));
    this.set('jobs', this.get('store').findAll('job'));
  },

  serviceJobs: Ember.computed('jobs.[]', function() {
    return this.get('jobs').filter((job) => {
      var serviceRelationship = job.get(this.get('modelName'));

      if (serviceRelationship) {
        return (serviceRelationship.get('id') === this.get('service.id'));
      }
    });
  }),

  hasServiceJobs: Ember.computed('serviceJobs.[]', function() {
    return (this.get('serviceJobs.length'));
  }),

  job: Ember.computed('sortedJobs.firstObject', function() {
    return this.get('sortedJobs.firstObject');
  }),

  pluralModelName: Ember.computed('modelName', function() {
    return pluralize(this.get('modelName'));
  }),

  percentageStored: Ember.computed('serviceJobs.@each.percentageStored', function() {
    if (this.get('modelName') === 'source') {
      return this.get('job.percentageStored');
    }
  }),

  totalItemsAvailable: Ember.computed('sortedJobs.@each.totalItemsAvailable', function() {
    if (this.get('modelName') === 'source') {
      return this.get('job.totalItemsAvailable');
    }
  }),

  totalItemsStored: Ember.computed('serviceJobs.@each.totalItemsStored', function() {
    if (this.get('modelName') === 'source') {
      return this.get('job.totalItemsStored');
    } else if (this.get('modelName') === 'storage') {
      return this.get('totalJobItemsStored');
    }
  }),

  totalJobItemsStored: Ember.computed('serviceJobs.@each.totalItemsStored', function() {
    if (this.get('jobs')) {
      return this.get('jobs').map((job) => job.get('totalItemsStored')).reduce((accumulator, currentValue) => {
        if (currentValue) {
          return accumulator + currentValue;
        } else {
          return accumulator;
        }
      }, 0);
    }
  })
});