var stream = require('stream');
var util = require('util');

/**
 * A simple writable stream that collects its data
 * in a `data` string.
 */

function Output() {
  stream.Writable.call(this);

  this.data = '';

  this._write = function(chunk, encoding, callback) {
    this.data += String(chunk);
    callback();
    /*
      TODO why does process.nextTick(callback) not work?
    */
  };
}

util.inherits(Output, stream.Writable);

module.exports = Output;
