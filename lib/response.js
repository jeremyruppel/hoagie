var util = require('util');

exports = module.exports = {
  __proto__: process.stdout.__proto__
};

/**
 * Since process.stdout can't end, use this to signal the end of
 * the program's output stream, optionally writing `chunk` to
 * the output before exiting.
 */

exports.end = format(function(chunk) {
  if (chunk) {
    this.write(chunk);
  }
  this.emit('exit');
});

/**
 * Writes `chunk` to stdout and adds a newline. If multiple arguments
 * are passed, they will be formatted with `util.format`.
 * @param {String|Buffer} chunk
 */

exports.writeln = format(function(chunk) {
  return this.write(chunk + '\n');
});

/**
 * Writes `chunk` to stdout and end with a newline. If multiple arguments
 * are passed, they will be formatted with `util.format`.
 * @param {String|Buffer} chunk
 */

exports.send = format(function(chunk) {
  return this.end(chunk + '\n');
});

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
 * All hoagie output methods support util.format placeholder
 * formatting.
 */

function format(fn) {
  return function(chunk) {
    if (arguments.length > 1) {
      chunk = util.format.apply(null, arguments);
    }
    fn.call(this, chunk);
  };
}
