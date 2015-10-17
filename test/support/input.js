var stream = require('stream');
var util = require('util');

/**
 * A simple read stream. The test should push any data into
 * this stream that it needs.
 */

function Input() {
  stream.Readable.call(this);
}

util.inherits(Input, stream.Readable);

Input.prototype._read = function(/* size */) {
  this.push(null);
};

module.exports = Input;
