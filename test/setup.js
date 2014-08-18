var assert = require('assert');
var nixt = require('nixt');
var fs = require('fs');

beforeEach(function() {
  this.example = nixt({
    colors: false
  }).cwd('example');
});

/**
 * Asserts that `stream` emits the data `expected` and then
 * calls the `done` callback.
 */
assert.data = function(stream, expected, done) {
  stream.on('error', done);
  stream.on('data', function(data) {
    assert.equal(String(data), expected);
    done();
  });
};
