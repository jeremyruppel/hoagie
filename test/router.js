var hoagie = require('..');
var assert = require('assert');
var invoke = require('./support');

/* jshint mocha:true */

describe('router', function() {
  it('runs middleware that match the command', function(done) {
    var app = hoagie();

    app.use('foo', function() {
      done(new Error('Middleware should not have been called'));
    });

    app.use('bar', function() {
      done();
    });

    invoke(app).run([
      'bar'
    ]).end(function() {});
  });
  it('runs all middleware that match the command', function(done) {
    var app = hoagie();

    app.use('foo', function(/* req, res, next */) {
      done(new Error('Middleware should not have been called'));
    });

    app.use('bar', function(req, res, next) {
      res.write('a');
      next();
    }, function(req, res, next) {
      res.write('b');
      next();
    });

    invoke(app).run([ 'bar' ]).expect('ab', done);
  });
  it('can be mounted', function(done) {
    var app = hoagie();
    var rtr = hoagie.Router();

    rtr.use('foo', function(req /*, res */) {
      assert.equal(req.params[0], 'foo');
      done();
    });

    app.use(rtr);

    invoke(app).run([
      'foo'
    ]).end(function() {});
  });
});
