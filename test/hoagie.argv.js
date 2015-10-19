var hoagie = require('..');
var assert = require('assert');

/* jshint mocha:true */

describe('hoagie.argv', function() {
  it('is an alias for process.argv.slice(2)', function() {
    assert.deepEqual(hoagie.argv, process.argv.slice(2));
  });
});
