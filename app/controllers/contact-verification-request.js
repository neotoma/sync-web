import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['code'],

  init() {
    this._super();
    this.set('contactVerifications', this.get('store').findAll('contactVerification'));
  },

  contactVerification: Ember.computed('contactVerifications.[]', function() {
    return this.get('contactVerifications').findBy('contactVerificationRequest.id', this.get('contactVerificationRequest.id'));
  })
});
