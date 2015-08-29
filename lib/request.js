var minimist = require('minimist');
var stream = require('stream');
var util = require('util');

function Request(argv) {
  stream.Readable.call(this);

  this.params = minimist(argv);
}

util.inherits(Request, stream.Readable);

Request.prototype._read = function(size) {
  return process.stdin.read(size);
};

module.exports = Request;
