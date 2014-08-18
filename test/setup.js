var assert = require('assert');
var nixt = require('nixt');
var fs = require('fs');

/**
 * Appends `dir` to the world's PATH
 */
nixt.register('path', function(dir) {
  var path = require('path');
  var PATH = this.world.env.PATH;

  return this.env('PATH',
    path.join(process.cwd(), dir) + path.delimiter + PATH);
});

beforeEach(function() {
  this.example = nixt({
    colors: false
  }).cwd('examples').path('examples');
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
