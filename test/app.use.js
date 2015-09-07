var hoagie = require('..');
var assert = require('assert');

/* jshint mocha:true */

describe('app.use', function() {
  it('adds a middleware', function(done) {
    var app = hoagie();

    app.use(function(/* req, res, next */) {
      done();
    });

    app.run([]);
  });
  it('adds a middleware with a subcommand', function(done) {
    var app = hoagie();

    app.use('foo', function(/* req, res, next */) {
      done();
    });

    app.run([
      'foo'
    ]);
  });
  it('mounts a sub-app', function(done) {
    var app = hoagie();
    var sub = hoagie();

    sub.use('bar', function(req /*, res, next */) {
      assert.equal(req.params[0], 'bar');
      assert.equal(req.params[1], 'baz');
      done();
    });

    app.use(sub);

    app.run([
      'foo', 'bar', 'baz'
    ]);
  });
  it('mounts a sub-app under a command', function(done) {
    var app = hoagie();
    var sub = hoagie();

    sub.use('bar', function(req /*, res, next */) {
      assert.equal(req.params[0], 'bar');
      assert.equal(req.params[1], 'baz');
      done();
    });

    app.use('foo', sub);

    app.run([
      'foo', 'bar', 'baz'
    ]);
  });
  it('restores the params after a sub-app', function(done) {
    var app = hoagie();
    var sub = hoagie();

    app.use('foo', sub);
    app.use('foo', function(req /*, res, next */) {
      assert.equal(req.params[0], 'foo');
      assert.equal(req.params[1], 'bar');
      assert.equal(req.params[2], 'baz');
      done();
    });

    app.run([
      'foo', 'bar', 'baz'
    ]);
  });
  it('propagates errors to the super app');
});
