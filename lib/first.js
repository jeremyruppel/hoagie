/**
 * TODO
 */
module.exports = function(fns, obj, done) {
  var arr = [].concat(fns);

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
