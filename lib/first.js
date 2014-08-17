/**
 * Yields `obj` to each function in turn and yields the
 * first truthy value yielded by a function. If no function
 * yields a truthy value, an error will be yielded instead.
 */
module.exports = function(fns, obj, done) {
  var arr = Array.prototype.concat(fns);

  function next(err, val) {
    if (err) {
      done(err);
    } else if (val) {
      done(null, val);
    } else if (arr.length) {
      arr.shift()(obj, next);
    } else {
      done(new Error('No functions yielded'));
    }
  }

  next();
};
