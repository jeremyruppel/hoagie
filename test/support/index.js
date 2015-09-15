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
  this._tests  = [];
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
  switch (output.constructor) {
  case String:
    this._tests.push(function string(result) {
      assert.equal(result, output);
    });
    break;
  case RegExp:
    this._tests.push(function regexp(result) {
      assert(output.test(result), 'Expected ' + result + ' to match ' + output);
    });
    break;
  }

  if (done) {
    return this.end(done);
  } else {
    return this;
  }
};

Test.prototype.end = function(done) {
  var app    = this._app;
  var argv   = this._argv;
  var tests  = this._tests;
  var stdin  = this._stdin;
  var stdout = this._stdout;

  app.run(argv, stdin, stdout).on('finish', function() {
    try {
      tests.forEach(function(test) {
        test(stdout.data);
      });
    } catch (err) {
      return done(err);
    }
    done();
  });
};
