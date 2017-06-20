import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('contactVerificationRequest', params.id);
  },

  setupController(controller, contactVerificationRequest) {
    controller.set('contactVerificationRequest', contactVerificationRequest);
    controller.set('verified', contactVerificationRequest.get('verified'));
  },

  actions: {
    verifyAddress() {
      var contactVerificationRequest = this.get('controller.contactVerificationRequest');
      contactVerificationRequest.set('code', this.get('controller.code'));
      contactVerificationRequest.set('verified', true);

      contactVerificationRequest.save().then(() => {
        this.set('controller.verified', true);
      });
    }
  }
});
