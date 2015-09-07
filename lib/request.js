var minimist = require('minimist');
var stream = require('stream');
var merge = require('merge-descriptors');
var util = require('util');

function Request(argv, stdin) {
  stream.Readable.call(this);

  this.stdin = stdin;

  this.params = merge([], minimist(argv));
}

util.inherits(Request, stream.Readable);

Request.prototype._read = function(size) {
  this.push(this.stdin.read(size));
};

Request.prototype.get = function(key) {
  return process.env[key];
};

module.exports = Request;
