import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {
  collapsed: false,
  options: null,

  show() {
    this.trigger('show');
  }
});
