import Ember from 'ember';

/**
 * Returns HTML for repeating empty element
 * @param (string) name - Name of element
 * @param (integer) count - Repetition count
 * @return (string) HTML
 */
export function repeatElement(name, count) {
  var elements = '';

  for (var i = 1; i <= count; i++) {
    elements += `<${name} />`;
  }

  return Ember.String.htmlSafe(elements);
}

export default Ember.Helper.helper(repeatElement);
