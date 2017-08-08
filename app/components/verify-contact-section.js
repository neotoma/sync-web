import Ember from 'ember';
import NoticeSectionComponent from './notice-section';

export default NoticeSectionComponent.extend({
  buttonAction: 'verifyContact',
  buttonLabel: 'Verify address',
  header: 'Please hit the following button to verify your address',
  layoutName: 'components/notice-section',
  store: Ember.inject.service(),

  actions: {
    verifyContact() {
      this.transitionPromise((resolve, reject) => {
        this.get('store').createRecord('contactVerification', {
          contactVerificationRequest: this.get('contactVerificationRequest'),
          contactVerificationRequestCode: this.get('contactVerificationRequest.code')
        }).save().then((contactVerification) => {
          resolve();
        }).catch(reject);
      });
    }
  }
});
