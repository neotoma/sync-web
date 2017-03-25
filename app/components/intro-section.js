import Ember from 'ember';
import ComponentTransitionsMixin from '../mixins/component-transitions';

export default Ember.Component.extend(ComponentTransitionsMixin, {
  tagName: 'section',
  classNames: ['intro']
});