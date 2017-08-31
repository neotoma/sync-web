import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',

  init() {
    this._super(...arguments);

    Ember.run.next(() => {
      this.set('loaded', true);
    });
  },

  properties: Ember.computed('service.id', 'service.name', 'service.isSelected', function() {
    return {
      selected: !this.get('service.isSelected'),
      service: this.get('service.id'),
      serviceModelName: this.get('service').constructor.modelName,
      serviceName: this.get('service.name')
    };
  })
});
