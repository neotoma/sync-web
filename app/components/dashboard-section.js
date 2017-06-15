import Ember from 'ember';

export default Ember.Component.extend({
  appNav: Ember.inject.service(),
  classNames: ['dashboard'],
  jobs: [],
  sessions: Ember.inject.service(),
  socket: Ember.inject.service(),
  store: Ember.inject.service(),
  tagName: 'section',

  init() {
    this._super(...arguments);
    this.get('socket').listenFor(['item', 'job']);
    this.set('appNav.collapsed', true);
    this.set('jobs', this.get('store').findAll('job').then((jobs) => {
      this.set('jobs', jobs);
      this.set('loaded', true);
    }));
  },

  hasJobs: Ember.computed('jobs.[]', function() {
    return (this.get('jobs.length'));
  })
});
