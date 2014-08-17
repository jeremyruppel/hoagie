var columnify = require('columnify');

/**
 * Formats `hsh` into columns.
 */
module.exports = function(hsh) {
  return columnify(hsh, {
    showHeaders: false,
    columnSplitter: '  '
  });
};
