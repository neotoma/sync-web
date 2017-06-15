import DS from 'ember-data';

export default DS.Model.extend({
  contentType: DS.belongsTo('contentType'),
  description: DS.attr('string'),
  source: DS.belongsTo('source'),
  sourceCreatedAt: DS.attr('date'),
  sourceItem: DS.attr('string'),
  storage: DS.belongsTo('storage'),
  storageAttemptedAt: DS.attr('date'),
  storageBytes: DS.attr('number'),
  storageError: DS.attr('string'),
  storageFailedAt: DS.attr('date'),
  storagePath: DS.attr('string'),
  storageVerifiedAt: DS.attr('date'),
  user: DS.belongsTo('user'),
});
