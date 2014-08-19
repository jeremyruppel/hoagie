var subject = require('../lib/uniq');
var assert = require('assert');

/* global describe, it */

describe('uniq', function() {
  it('removes duplicate items from an array', function() {
    assert.deepEqual(subject([1, 2, 2, 3, 1, 4, 4]), [1, 2, 3, 4]);
  });
});
