import Ember from 'ember';

/**
 * Converts array to comma-delimited string with final separator instead of comma before final value
 * @param (Array) a - Array to comma-delimit
 * @param (string) [finalSeparator=and] - Final separator token
 * @see {@link https://stackoverflow.com/questions/16251822/array-to-comma-separated-string-and-for-last-tag-use-the-and-instead-of-comma|Stack Overflow}
 */
export function arrayToString(a, finalSeparator) {
  if (!a || !a.length) { return; }

  finalSeparator = finalSeparator ? finalSeparator : 'and';
  return [a.slice(0, -1).join(', '), a.slice(-1)[0]].join(a.length < 2 ? '' : ' ' + finalSeparator + ' ');
}

export default Ember.Helper.helper(arrayToString);
