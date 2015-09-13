var stream = require('stream');
var util = require('util');

/**
 * Creates a new Response instance. Responses are writable streams
 * that delegate to `stdout`
 * @param {stream.Writable} stdout The standard output stream
 * @constructor
 */

function Response(stdout) {
  stream.Writable.call(this);

  this.stdout = stdout;

  this.exitCode = 0;
}

util.inherits(Response, stream.Writable);

/**
 * @api private
 */

Response.prototype._write = function(chunk, encoding, callback) {
  return this.stdout.write(chunk, encoding, callback);
};

/**
 * Writes `chunk` to stdout and end with a newline.
 * @param {String|Buffer} chunk
 */

Response.prototype.send = function(chunk) {
  return this.end(chunk + '\n');
};

/**
 * Sets the program's exit code to `code`.
 * @param {Number} code The exit status code
 * @returns {Response} this
 */

Response.prototype.code = function(code) {
  this.exitCode = code;
  return this;
};

module.exports = Response;
