var minimist = require('minimist');
var stream = require('stream');
var util = require('util');

function Request(argv, stdin) {
  stream.Readable.call(this);

  this.stdin = stdin;

  this.params = minimist(argv);
}

util.inherits(Request, stream.Readable);

Request.prototype._read = function(size) {
  this.push(this.stdin.read(size));
};

module.exports = Request;
