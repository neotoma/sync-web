import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('cart');
  this.route('contact-verification-request', { path: '/contact-verification-requests/:id' });
  this.route('sources');
  this.route('source', { path: '/sources/:id' });
  this.route('sources-picker');
  this.route('storage', { path: '/storages/:id' });
  this.route('storages');
  this.route('storages-picker');
});

export default Router;
