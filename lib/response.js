var util = require('util');

exports = module.exports = {
  __proto__: process.stdout.__proto__
};

/**
 * TODO
 */

exports.end = function(chunk) {
  if (chunk) {
    this.write(chunk);
  }
  this.emit('exit');
};

/**
 * Writes `chunk` to stdout and adds a newline. If multiple arguments
 * are passed, they will be formatted with `util.format`.
 * @param {String|Buffer} chunk
 */

exports.writeln = function(chunk) {
  if (arguments.length > 1) {
    return this.write(format(arguments) + '\n');
  }
  return this.write(chunk + '\n');
};

/**
 * Writes `chunk` to stdout and end with a newline. If multiple arguments
 * are passed, they will be formatted with `util.format`.
 * @param {String|Buffer} chunk
 */

exports.send = function(chunk) {
  if (arguments.length > 1) {
    return this.end(format(arguments) + '\n');
  }
  return this.end(chunk + '\n');
};

/**
 * Sets the program's exit code to `code`.
 * @param {Number} code The exit status code
 * @returns {Response} this
 */

exports.code = function(code) {
  this.exitCode = code;
  return this;
};

/**
 * Render the given view `file` using `locals` as
 * a context. The `locals` given will use this
 * application's locals as a prototype.
 * @param {String} file The path to the view file
 * @param {Object} [locals] The locals hash
 * @returns {String}
 * @throws
 */

exports.render = function(file, locals) {
  return this.end(this.app.render(file, locals));
};

/**
 * Passes `args` to util.format.
 * @param {Array} args The arguments to format
 * @returns {String}
 */

function format(args) {
  return util.format.apply(null, args);
}
