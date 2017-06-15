import Ember from 'ember';
import SmoothTransitionInitializer from 'sync-web/initializers/smooth-transition';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | smooth transition', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  SmoothTransitionInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
