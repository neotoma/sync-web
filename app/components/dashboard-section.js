import Ember from 'ember';

export default Ember.Component.extend({
  appNav: Ember.inject.service(),
  classNames: ['dashboard'],
  socket: Ember.inject.service(),
  store: Ember.inject.service(),
  tagName: 'section',

  init() {
    this._super(...arguments);
    this.get('socket').listenFor(['item', 'job']);
    this.set('appNav.collapsed', true);

    Promise.all([
      this.get('store').findAll('item'),
      this.get('store').findAll('job')
    ]).then(([items, jobs]) => {
      this.set('items', items);
      this.set('jobs', jobs);
      this.set('loaded', true);
    });
  },

  hasJobs: Ember.computed('jobs.[]', function() {
    return (this.get('jobs.length'));
  })
});
