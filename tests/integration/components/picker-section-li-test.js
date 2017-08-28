import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('picker-section-li', 'Integration | Component | picker section li', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{picker-section-li}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#picker-section-li}}
      template block text
    {{/picker-section-li}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
