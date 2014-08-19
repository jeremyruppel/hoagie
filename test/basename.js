var subject = require('../lib/basename');
var assert = require('assert');

/* global describe, it */

describe('basename', function() {
  it('returns the basename of `file`', function() {
    assert.equal(subject('/a/b/c'), 'c');
  });
  it('removes the extension from `file`', function() {
    assert.equal(subject('/a/b/c.txt'), 'c');
  });
  it('removes the prefix from `file`', function() {
    assert.equal(subject('/a/b/foo-c.txt', 'foo-'), 'c');
  });
});
