import _ from 'npm:lodash';
import Ember from 'ember';
import {pluralize} from 'ember-inflector';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  hasJobsToStart: Ember.computed('sourcesWithoutJobs.[]', 'userStorageAuths.[]', function() {
    return (this.get('sourcesWithoutJobs.length') && this.get('userStorageAuths'));
  }),

  init() {
    this._super(...arguments);
    this.set('contactVerificationRequests', this.get('store').findAll('contactVerificationRequest'));
    this.set('sessions', this.get('store').findAll('session', { include: 'users,userSourceAuths,userStorageAuths' }));
    this.initRelatedRecords();
  },

  initRelatedRecords() {
    [ 'job',
      'userSourceAuth',
      'userStorageAuth'
    ].forEach((modelName) => {
      this.set(pluralize(modelName), Ember.computed('user', function() {
        return this.userRelatedRecords(modelName);
      }));
    });
  },

  session: Ember.computed('sessions.firstObject', function() {
    return this.get('sessions.firstObject');
  }),

  sources: Ember.computed('userSourceAuths.[]', function() {
    if (!this.get('userSourceAuths')) { return; }
    return this.get('userSourceAuths').map((auth) => auth.get('source'));
  }),

  sourcesWithoutJobs: Ember.computed('sources.[]', 'jobs.[]', function() {
    if (!this.get('sources')) { return; }

    var sources = [];

    this.get('sources').forEach((source) => {
      if (!this.get('jobs').findBy('source.id', source.get('id'))) {
        sources.push(source);
      }
    });

    return sources;
  }),

  storages: Ember.computed('userStorageAuths.[]', function() {
    if (!this.get('userStorageAuths')) { return; }
    return this.get('userStorageAuths').map((auth) => auth.get('storage'));
  }),

  user: Ember.computed('session.users.firstObject', function() {
    return this.get('session.users.firstObject');
  }),

  /**
   * Queries store for records related to session user
   * @param (string) modelName - Name of model for records to query
   */
  userRelatedRecords(modelName) {      
    if (!modelName || !this.get('user')) { return; }

    return this.get('store').findAll(modelName);
  },

  /**
   * Indicates whether session user has at least one associated authentication object per type of auth
   */
  hasUserSourceAndStorageAuth: Ember.computed('userSourceAuths.[]', 'userStorageAuths.[]', function() {
    return (this.get('userSourceAuths.length') && this.get('userStorageAuths.length'));
  }),

  /**
   * Indicates whether session user has associated authenticated object for given service
   */
  hasUserServiceAuth(service) {
    return this.get(`user${_.upperFirst(service.constructor.modelName)}Auths`).then((userAuths) => {
      var found = false;

      userAuths.forEach((userAuth) => {
        if (userAuth.get(service.constructor.modelName).get('id') === service.get('id')) {
          found = true;
        }
      });

      return found;
    });
  }
});
