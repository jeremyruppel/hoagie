/**
 * Return a copy of `arr` with all duplicate entries removed.
 */
module.exports = function(arr) {
  var hsh = {};

  return arr.filter(function(str) {
    return hsh[str] ? false : (hsh[str] = true);
  });
};
