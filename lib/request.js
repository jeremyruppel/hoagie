var stream = require('stream');
var util = require('util');

/**
 * Creates a new Request instance. Requests are readable streams
 * that delegate to `stdin`
 * @param {Array} argv The argv array
 * @param {stream.Readable} stdin The standard input stream
 * @constructor
 */

function Request(stdin) {
  stream.Readable.call(this);

  this.stdin = stdin;
}

util.inherits(Request, stream.Readable);

/**
 * @api private
 */

Request.prototype._read = function(size) {
  this.push(this.stdin.read(size));
};

/**
 * Returns the value of the environment variable `name`.
 * @param {String} name
 * @returns {String|undefined}
 */

Request.prototype.get = function(name) {
  return process.env[name];
};

/**
 * Returns the program name.
 * @returns {String}
 */

Request.prototype.__defineGetter__('program', function() {
  return this.app.get('program');
});

/**
 * Returns the command name. This is a synonym for the
 * first ordinal param.
 * @returns {String}
 */

Request.prototype.__defineGetter__('command', function() {
  return this.params[0];
});

module.exports = Request;
