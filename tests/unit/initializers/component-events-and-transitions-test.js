import Ember from 'ember';
import ComponentEventsAndTransitionsInitializer from 'sync-web/initializers/component-events-and-transitions';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | component events and transitions', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  ComponentEventsAndTransitionsInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
