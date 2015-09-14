var assert = require('assert');

/**
 * Returns a new Test instance for `app`.
 * @param {Application} app
 * @returns {Test}
 */

exports = module.exports = function invoke(app) {
  return new Test(app);
};

/**
 * Expose stdio helpers
 */

exports.Input = require('./input');
exports.Output = require('./output');

/**
 * supertest-style test helper for hoagie applications.
 * @constructor
 */

function Test(app) {
  this._app    = app;
  this._stdin  = new exports.Input;
  this._stdout = new exports.Output;
}

Test.prototype = {};

/**
 * Use `chunk` as the input from stdin.
 * @param {Buffer|String} chunk
 * @returns {Test} this
 */

Test.prototype.stdin = function(chunk) {
  this._stdin = new exports.Input(chunk);
  return this;
};

/**
 * Use `argv` as the application invocation.
 * @param {Array} argv
 * @returns {Test} this
 */

Test.prototype.run = function(argv) {
  this._argv = argv;
  return this;
};

/**
 * Invoke the application and expect `output`
 * to be written to stdout.
 * @param {String} output
 * @param {Function} done
 */

Test.prototype.expect = function(output, done) {
  var app    = this._app;
  var argv   = this._argv;
  var stdin  = this._stdin;
  var stdout = this._stdout;

  app.run(argv, stdin, stdout).on('finish', function() {
    try {
      assert.equal(stdout.data, output);
    } catch (err) {
      return done(err);
    }
    done();
  });
};

Test.prototype.end = function() {
  this._app.run(this._argv, this._stdin, this._stdout);
};
