import DS from 'ember-data';

export default DS.Model.extend({
  contentType: DS.belongsTo('contentType'),
  name: DS.attr('string'),
  source: DS.belongsTo('source'),
  storage: DS.belongsTo('storage'),
  user: DS.belongsTo('user')
});