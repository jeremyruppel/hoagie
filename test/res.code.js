var hoagie = require('..');
var assert = require('assert');

/* jshint mocha:true */

describe('res.code', function() {
  it('sets res.exitCode', function(done) {
    hoagie().use(function(req, res) {
      assert.equal(res.exitCode, 0);
      res.code(128);
      assert.equal(res.exitCode, 128);
      done();
    }).run([]);
  });
  it('is chainable', function(done) {
    hoagie().use(function(req, res) {
      assert.equal(res.code(128).exitCode, 128);
      done();
    }).run([]);
  });
});
