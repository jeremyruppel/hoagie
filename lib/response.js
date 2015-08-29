var stream = require('stream');
var util = require('util');

function Response(stdout) {
  stream.Writable.call(this);

  this.stdout = stdout;

  this.exitCode = 0;

  this.on('finish', function() {
    process.exitCode = this.exitCode;
  });
}

util.inherits(Response, stream.Writable);

Response.prototype._write = function(chunk, encoding, callback) {
  return this.stdout.write(chunk, encoding, callback);
};

Response.prototype.send = function(chunk) {
  return this.end(chunk + '\n');
};

module.exports = Response;
