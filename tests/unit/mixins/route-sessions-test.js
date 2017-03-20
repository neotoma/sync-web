import Ember from 'ember';
import RouteSessionsMixin from 'sync-web/mixins/route-sessions';
import { module, test } from 'qunit';

module('Unit | Mixin | route sessions');

// Replace this with your real tests.
test('it works', function(assert) {
  let RouteSessionsObject = Ember.Object.extend(RouteSessionsMixin);
  let subject = RouteSessionsObject.create();
  assert.ok(subject);
});
