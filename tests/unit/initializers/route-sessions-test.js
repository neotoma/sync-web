import Ember from 'ember';
import RouteSessionsInitializer from 'sync-web/initializers/route-sessions';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | route sessions', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  RouteSessionsInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
