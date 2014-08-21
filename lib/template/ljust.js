/**
 * Adds spaces to the right of `str` until it is `len` chars long.
 */
module.exports = function(str, len) {
  while (str.length < len) {
    str += ' ';
  }
  return str;
};
