var stream = require('stream');

/**
 * A simple read stream. The test should push any data into
 * this stream that it needs.
 */

module.exports = function stdin() {
  var s = new stream.Readable();

  s._read = function(/* size */) {
    this.push(null);
  };

  return s;
};
