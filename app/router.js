import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('storages');
  this.route('sources');
  this.route('source', { path: '/sources/:id' });
  this.route('storage', { path: '/storages/:id' });
  this.route('storages-picker');
  this.route('sources-picker');
  this.route('cart');
  this.route('contact-verification-request', { path: '/contact-verification-requests/:id' });
});

export default Router;
