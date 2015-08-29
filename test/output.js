var stream = require('stream');
var util = require('util');

/**
 * A simple writable stream that collects its data
 * in a `data` string.
 */

function Output() {
  stream.Writable.call(this);

  this.data = '';
}

util.inherits(Output, stream.Writable);

Output.prototype._write = function(chunk, encoding, callback) {
  this.data += String(chunk);
  process.nextTick(callback);
};

module.exports = Output;
