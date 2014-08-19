var path = require('path');

/**
 * Returns the basename of `file`, optionally with `prefix` removed.
 */
module.exports = function(file, prefix) {
  return path.basename(file, path.extname(file)).replace(prefix, '');
};
