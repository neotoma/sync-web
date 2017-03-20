import DS from 'ember-data';

export default DS.Model.extend({
  storage: DS.belongsTo('storage'),
  user: DS.belongsTo('user')
});