var hoagie = require('..');
var assert = require('assert');

/* jshint mocha:true */

describe('hoagie', function() {
  it('creates an application', function() {
    assert.equal(typeof hoagie(), 'function');
  });
});
