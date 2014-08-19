/**
 * Flattens one level of the items and second order arrays in `arr`.
 */
module.exports = function(arr) {
  return arr.reduce(function(memo, item) {
    return memo.concat(item);
  }, []);
};
