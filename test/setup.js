var assert = require('assert');

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
