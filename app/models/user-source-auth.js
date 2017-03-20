import DS from 'ember-data';

export default DS.Model.extend({
  source: DS.belongsTo('source'),
  user: DS.belongsTo('user')
});
