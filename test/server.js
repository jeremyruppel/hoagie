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
  it('emits the "start" event', function(done) {
    hoagie.createServer(function(req, res) {
      res.end();
    }).run([]).on('start', function() {
      done();
    });
  });
  it('adds argv to req', function(done) {
    hoagie.createServer(function(req /*, res */) {
      assert.deepEqual(req.argv, [ 'foo', 'bar' ]);
      done();
    }).run([ 'foo', 'bar' ]);
  });
  it('sets the exit code', function(done) {
    hoagie.createServer(function(req, res) {
      res.exitCode = 1;
      res.end();
    }).run([]).on('start', function() {
      assert.equal(process.exitCode, 0);
    }).on('finish', function() {
      assert.equal(process.exitCode, 1);
      done();
    });
  });
  it('emits the "finish" event', function(done) {
    hoagie.createServer(function(req, res) {
      res.exitCode = 1;
      res.end();
    }).run([]).on('finish', function(code) {
      assert.equal(code, 1);
      done();
    });
  });
});
