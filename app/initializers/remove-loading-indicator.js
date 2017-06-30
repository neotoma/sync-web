import Ember from 'ember';
import config from '../config/environment';

export function initialize(/* application */) {
  Ember.$('body>div.loading-indicator').fadeOut(config.transitionDelay, function() {
    $(this).remove();
  });
}

export default {
  name: 'remove-loading-indicator',
  initialize
};
