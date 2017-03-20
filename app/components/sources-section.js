import Ember from 'ember';
import ComponentTransitionsMixin from '../mixins/component-transitions';

export default Ember.Component.extend(ComponentTransitionsMixin, {
  classNames: ['sources'],
  socketIOService: Ember.inject.service('socket-io'),
  sortedSourcesProperties: ['name:asc'],
  sortedSources: Ember.computed.sort('sources', 'sortedSourcesProperties'),
  store: Ember.inject.service(),
  tagName: 'section',

  init() {
    this._super(...arguments);

    var socket = this.get('socketIOService').socketFor('https://' + window.EmberENV.API_HOST);

    this.get('store').findAll('source').then((sources) => {
      this.set('sources', sources);

      Ember.run.next(() => {
        this.set('loaded', true);
      });
    }).catch((error) => {
      this.handleError(error);
    });
  }
});