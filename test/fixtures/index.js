var path = require('path');
var fs = require('fs');

/**
 * Returns the contents of the fixture `file`.
 */
module.exports = function(file) {
  return fs.readFileSync(path.join(__dirname, file), 'utf8').trim();
};
