import Ember from 'ember';
import ComponentTransitionsMixin from '../mixins/component-transitions';

export default Ember.Component.extend(ComponentTransitionsMixin, {
  classNames: ['storages'],
  store: Ember.inject.service(),
  sortedStoragesProperties: ['name:asc'],
  sortedStorages: Ember.computed.sort('storages', 'sortedStoragesProperties'),
  tagName: 'section',

  init() {
    this._super(...arguments);

    this.get('store').findAll('storage').then((storages) => {
      this.set('storages', storages);

      Ember.run.next(() => {
        this.set('loaded', true);
      });
    }).catch((error) => {
      this.handleError(error);
    });
  }
});