var minimist = require('minimist');
var stream = require('stream');
var merge = require('merge-descriptors');
var util = require('util');

function Request(argv, stdin) {
  stream.Readable.call(this);

  this.stdin = stdin;

  var opts = minimist(argv);

  this.params = merge(opts._, opts);
}

util.inherits(Request, stream.Readable);

Request.prototype._read = function(size) {
  this.push(this.stdin.read(size));
};

Request.prototype.get = function(key) {
  return process.env[key];
};

module.exports = Request;
