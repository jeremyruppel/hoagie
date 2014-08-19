var subject = require('../lib/which');
var assert = require('assert');

/* global describe, it */

describe('which', function() {
  it('returns files in the paths that match the pattern', function() {
    assert.deepEqual(subject('which.js', [
      __dirname
    ]), [
      __dirname + '/which.js'
    ]);
  });
  it('returns files in the paths that match a glob', function() {
    assert.deepEqual(subject('s*', [
      __dirname
    ]), [
      __dirname + '/setup.js'
    ]);
  });
});
