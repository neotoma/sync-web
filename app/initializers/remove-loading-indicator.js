import Ember from 'ember';
import config from '../config/environment';

export function initialize(/* application */) {
  Ember.$('body>div.loading-indicator').fadeOut(config.transitionDelay, function() {
    Ember.$(this).remove();
  });
}

export default {
  name: 'remove-loading-indicator',
  initialize
};
