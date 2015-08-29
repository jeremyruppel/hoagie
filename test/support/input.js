var stream = require('stream');
var util = require('util');

/**
 * A simple stream that pushes `data` to consumers.
 */

function Input(data) {
  stream.Readable.call(this);

  this.data = data;
}

util.inherits(Input, stream.Readable);

Input.prototype._read = function(/* size */) {
  this.push(this.data);
  this.push(null);
};

module.exports = Input;
