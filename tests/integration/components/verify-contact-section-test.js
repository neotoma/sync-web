import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('verify-contact-section', 'Integration | Component | verify contact section', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{verify-contact-section}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#verify-contact-section}}
      template block text
    {{/verify-contact-section}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
