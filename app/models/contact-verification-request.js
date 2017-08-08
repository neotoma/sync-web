import DS from 'ember-data';

export default DS.Model.extend({
  authenticateSession: DS.attr('boolean'),
  clientOrigin: DS.attr('string'),
  code: DS.attr('string'),
  contact: DS.attr('string'),
  createNotificationRequests: DS.attr(),
  createUser: DS.attr('string'),
  method: DS.attr('string'),
  verified: DS.attr('boolean')
});
