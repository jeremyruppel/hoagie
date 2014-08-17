var os = require('os');

/**
 * Indents each line of the given string by `space`. If `space`
 * is a string it is used straight up. If `space` is a number,
 * it is treated as the number of spaces to use.
 */
module.exports = function(lines, space) {
  if (typeof space === 'number') {
    space = Array(space + 1).join(' ');
  }

  return lines.split(os.EOL).map(function(line) {
    return space + line;
  }).join(os.EOL);
};
