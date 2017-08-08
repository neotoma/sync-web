import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').query('contactVerificationRequest', {
      code: params.code,
      id: params.id
    }).then((contactVerificationRequests) => {
      return new Promise((resolve, reject) => {
        if (contactVerificationRequests.get('firstObject')) {
          this.get('store').findAll('contactVerification').then(() => {
            resolve(contactVerificationRequests.get('firstObject'));
          });
        } else {
          reject(new Error('Unable to get contactVerificationRequest matching id and code provided'));
        }
      });
    });
  },

  setupController(controller, contactVerificationRequest) {
    controller.set('contactVerificationRequest', contactVerificationRequest);
  }
});
