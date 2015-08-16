var hoagie = require('..');
var assert = require('assert');

/* jshint mocha:true */

describe('server', function() {
  it('returns a server instance', function() {
    assert.ok(hoagie.createServer().run);
  });
  it('yields request and response streams', function(done) {
    var server = hoagie.createServer(function(req, res) {
      assert.equal(req.readable, true);
      assert.equal(res.writable, true);
      done();
    });
    server.run([]);
  });
});
