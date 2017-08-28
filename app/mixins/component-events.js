import Ember from 'ember';

export default Ember.Mixin.create(Ember.Evented, {
  componentEvents: Ember.inject.service(),
  segment: Ember.inject.service(),

  init() {
    this._super(...arguments);
    this.get('componentEvents').on('hideAll', this, this.hide);
  },

  didDestroyElement() {
    this.get('componentEvents').off('hideAll', this, this.hide);
  },

  hide() {
    this.set('hidden', true);
  },

  actions: {
    trackEvent(name, properties) {
      this.get('segment').trackEvent(name, properties);

      if (event.target.href) {
        var href = event.target.href;
        
        Ember.run.later(() => {
          window.location = href;
        }, 500);
      }
    }
  }
});
