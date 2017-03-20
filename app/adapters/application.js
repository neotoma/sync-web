import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: 'https://' + window.EmberENV.API_HOST,

  ajax(url, method, hash) {
    hash = hash || {};
    hash.crossDomain = true;
    hash.xhrFields = {
      withCredentials: true
    };

    return this._super(url, method, hash);
  }
});