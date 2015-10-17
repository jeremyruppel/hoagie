var stream = require('stream');

/**
 * A simple writable stream that collects its data
 * in a `data` string.
 */

module.exports = function stdout() {
  var s = new stream.Writable();

  s.data = '';

  s._write = function(chunk, encoding, callback) {
    this.data += String(chunk);
    callback();
    /*
      TODO why does process.nextTick(callback) not work?
    */
  };

  return s;
};
