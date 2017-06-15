import ComponentEventsMixin from '../mixins/component-events';
import ComponentTransitionsMixin from '../mixins/component-transitions';
import Ember from 'ember';

export function initialize(/* application */) {
  Ember.Component.reopen(ComponentEventsMixin, ComponentTransitionsMixin);
}

export default {
  name: 'component-events',
  initialize
};
