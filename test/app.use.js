var hoagie = require('..');
var assert = require('assert');
var invoke = require('./support');

/* jshint mocha:true */

describe('app.use', function() {
  it('adds a middleware', function(done) {
    var app = hoagie();

    app.use(function(/* req, res, next */) {
      done();
    });

    invoke(app).run([]).end(function() {});
  });
  it('adds an error handler', function(done) {
    var app = hoagie();

    app.use(function(err, req, res, next) { // jshint ignore:line
      assert.equal(err.message, 'boom');
      done();
    });

    app.use(function(req, res, next) {
      next(new Error('boom'));
    });

    invoke(app).run([]).end(function() {});
  });
  it('adds multiple middleware', function(done) {
    var app = hoagie();
    var a;
    var b;

    app.use(function(req, res, next) {
      a = true;
      next();
    });
    app.use(function(req, res, next) {
      b = true;
      next();
    });
    app.use(function(/* req, res, next */) {
      assert.equal(a, true);
      assert.equal(b, true);
      done();
    });

    invoke(app).run([]).end(function() {});
  });
  it('adds multiple error handlers', function(done) {
    var app = hoagie();
    var a;
    var b;

    app.use(function(err, req, res, next) {
      a = true;
      next(err);
    });
    app.use(function(err, req, res, next) {
      b = true;
      next(err);
    });
    app.use(function(err, req, res, next) { // jshint ignore:line
      assert.equal(a, true);
      assert.equal(b, true);
      done();
    });

    app.use(function(req, res, next) {
      next(new Error('boom'));
    });

    invoke(app).run([]).end(function() {});
  });
  it('adds a middleware with a subcommand', function(done) {
    var app = hoagie();

    app.use('foo', function(/* req, res, next */) {
      done();
    });

    invoke(app).run([
      'foo'
    ]).end(function() {});
  });
  it('adds an error handler with a subcommand', function(done) {
    var app = hoagie();

    app.use('bar', function(err, req, res, next) { // jshint ignore:line
      done(new Error('Wrong subcommand!'));
    });

    app.use('foo', function(err, req, res, next) { // jshint ignore:line
      assert.equal(err.message, 'boom');
      done();
    });

    app.use('foo', function(req, res, next) {
      next(new Error('boom'));
    });

    invoke(app).run([
      'foo'
    ]).end(function() {});
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

    invoke(app).run([
      'foo', 'bar', 'baz'
    ]).end(function() {});
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

    invoke(app).run([
      'foo', 'bar', 'baz'
    ]).end(function() {});
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

    invoke(app).run([
      'foo', 'bar', 'baz'
    ]).end(function() {});
  });
  it('propagates errors to the super app', function(done) {
    var app = hoagie();
    var sub = hoagie();

    app.use(function(err, req, res, next) { // jshint ignore:line
      assert.equal(err.message, 'boom');
      done();
    });

    sub.use('bar', function(req , res, next) {
      next(new Error('boom'));
    });

    app.use('foo', sub);

    invoke(app).run([
      'foo', 'bar'
    ]).end(function() {});
  });
});
