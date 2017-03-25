import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  itemStorageEnabled: DS.attr('boolean'),
  logoGlyphPath: DS.attr('string'),
  name: DS.attr('string'),

  authUrl: Ember.computed('id', function() {
    if (this.get('itemStorageEnabled')) {
      return 'https://' + window.EmberENV.API_HOST + '/sources/' + this.get('id') + '/auth?redirectURL=' + encodeURIComponent(window.location);
    }
  }),

  logoGlyphUrl: Ember.computed('logoGlyphPath', function() {
    if (this.get('logoGlyphPath')) {
      return 'https://' + window.EmberENV.API_HOST + this.get('logoGlyphPath');
    }
  })
});