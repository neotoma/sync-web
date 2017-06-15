import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sources-picker-section', 'Integration | Component | sources picker section', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sources-picker-section}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sources-picker-section}}
      template block text
    {{/sources-picker-section}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
