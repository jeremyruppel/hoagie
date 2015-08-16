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
  it('returns a readable stream', function(done) {
    var server = hoagie.createServer(function(req, res) {
      res.end('OK');
    });

    var stream = server.run([]);

    assert.equal(stream.readable, true);

    stream.on('data', function(str) {
      assert.equal(str, 'OK');
      done();
    });
  });
  it('parses the command line options', function(done) {
    hoagie.createServer(function(req /*, res */) {
      assert.equal(req.argv._[0], 'foo');
      assert.equal(req.argv._[1], 'bar');
      assert.equal(req.argv.baz, 'yay');
      done();
    }).run([
      'foo', 'bar', '--baz', 'yay'
    ]);
  });
  it('sets the exit code', function(done) {
    hoagie.createServer(function(req, res) {
      res.exitCode = 1;
      res.end();
    }).run([]).on('readable', function() {
      assert.equal(process.exitCode, 0);
    }).on('end', function() {
      assert.equal(process.exitCode, 1);
      done();
    });
  });
});
