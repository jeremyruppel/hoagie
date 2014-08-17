var map = require('map-stream');
var ejs = require('ejs');
var columnify = require('columnify');

/**
 * Templates `data` into the text stream.
 */
module.exports = function(data) {
  return map(function(tmpl, done) {
    done(null, ejs.render(String(tmpl), data));
  });
};

/**
 * Formats `hsh` into columns.
 */
ejs.filters.columnify = function(hsh) {
  return columnify(hsh, {
    showHeaders: false,
    columnSplitter: '  '
  });
};

/**
 * Indents each line of the given string by `space`. If `space`
 * is a string it is used straight up. If `space` is a number,
 * it is treated as the number of spaces to use.
 */
ejs.filters.indent = function(lines, space) {
  var os = require('os');

  if (typeof space === 'number') {
    space = Array(space + 1).join(' ');
  }

  return lines.split(os.EOL).map(function(line) {
    return space + line;
  }).join(os.EOL);
};
