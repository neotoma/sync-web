import Ember from 'ember';

export default Ember.Route.extend({
  sessions: Ember.inject.service(),

  beforeModel: function() {
    return this.get('sessions').loadAll();
  }
});