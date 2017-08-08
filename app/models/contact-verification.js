import DS from 'ember-data';

export default DS.Model.extend({
  contactVerificationRequest: DS.belongsTo('contactVerificationRequest'),
  contactVerificationRequestCode: DS.attr('string'),
  user: DS.belongsTo('user')
});
