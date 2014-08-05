var path = require('path');
var glob = require('glob');
var from = require('from-source');
var merge = require('merge-stream');

/**
 * Returns a readable stream of a glob for `pattern` in `cwd`.
 *
 * @returns {stream.Readable}
 */
function which(pattern, cwd) {
  return from(function(write, done) {
    glob(pattern, {
      cwd: cwd
    }).on('match', function(file) {
      write(path.join(cwd, file));
    }).on('end', function() {
      done(null);
    });
  });
}

/**
 * Returns a stream that emits all files that match `pattern`
 * in the given `paths`. If `paths` is not supplied, the PATH
 * will be searched.
 *
 * @returns {stream.Readable}
 */
module.exports = function(pattern, paths) {
  var merged = merge();

  paths = paths || process.env.PATH.split(path.delimiter);

  paths.forEach(function(cwd) {
    merged.add(which(pattern, cwd));
  });

  return merged;
};
