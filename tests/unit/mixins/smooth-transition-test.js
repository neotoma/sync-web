import Ember from 'ember';
import SmoothTransitionMixin from 'sync-web/mixins/smooth-transition';
import { module, test } from 'qunit';

module('Unit | Mixin | smooth transition');

// Replace this with your real tests.
test('it works', function(assert) {
  let SmoothTransitionObject = Ember.Object.extend(SmoothTransitionMixin);
  let subject = SmoothTransitionObject.create();
  assert.ok(subject);
});
