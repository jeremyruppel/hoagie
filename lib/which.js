var path = require('path');
var glob = require('glob');
var flatten = require('./flatten');
var uniq = require('uniq');

/**
 * Returns all files in `paths` whose filenames match `pattern`.
 * If `paths` is not provided, the current PATH will be used.
 *
 * @returns {Array} the list of filenames
 */
module.exports = function(pattern, paths) {
  if (!paths) {
    paths = process.env.PATH.split(path.delimiter);
  }

  var files = paths.map(function(cwd) {
    return glob.sync(pattern, {
      cwd: cwd
    }).map(function(file) {
      return path.join(cwd, file);
    });
  });

  return uniq(flatten(files));
};
