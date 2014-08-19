var subject = require('../lib/flatten');
var assert = require('assert');

describe('flatten', function() {
  it('does not modify the first order array', function() {
    assert.deepEqual(subject([1, 2, 3]), [1, 2, 3]);
  });
  it('flattens second order arrays', function() {
    assert.deepEqual(subject([[1, 2], 3, [4]]), [1, 2, 3, 4]);
  });
});
