import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {
  socketIOService: Ember.inject.service('socket-io'),
  sessions: Ember.inject.service(),
  store: Ember.inject.service(),

  init() {
    this._super(...arguments);

    this.set('socket', this.get('socketIOService').socketFor('https://' + window.EmberENV.API_HOST));
  },

  listenFor(modelName) {
    var listenFor = (modelName) => {
      this.onSocket(modelName, (payload) => {
        var record = this.get('store').push(this.get('store').normalize(modelName, payload.data));
        this.trigger('pushedRecord', modelName, record);
      });
    };

    if (Array.isArray(modelName)) {
      modelName.forEach((modelName) => {
        listenFor(modelName);
      });
    } else {
      listenFor(modelName);
    }
  },

  onSocket(event, callback) {
    this.get('socket').on(event, callback);
  }
});
