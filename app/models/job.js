import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  contentType: DS.belongsTo('contentType'),
  createdAt: DS.attr('date'),
  name: DS.attr('string'),
  source: DS.belongsTo('source'),
  storage: DS.belongsTo('storage'),
  user: DS.belongsTo('user'),
  totalItemsAvailable: DS.attr('number'),
  totalItemsStored: DS.attr('number'),

  percentageStored: Ember.computed('totalItemsStored', 'totalItemsAvailable', function() {
    if (this.get('totalItemsStored') && this.get('totalItemsAvailable')) {
      return (this.get('totalItemsStored') / this.get('totalItemsAvailable') * 100).toFixed(2);
    }
  })
});