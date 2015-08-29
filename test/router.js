var hoagie = require('..');
var assert = require('assert');

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

    app.run(['bar']);
  });
  it('runs all middleware that match the command', function(done) {
    var app = hoagie();
    var arr = [];

    app.use('foo', function(/* req, res, next */) {
      done(new Error('Middleware should not have been called'));
    });
    app.use('bar', function(req, res, next) {
      arr.push('bar 1');
      next();
    });
    app.use('bar', function(req, res, next) {
      arr.push('bar 2');
      next();
    });

    app.run(['bar']).on('finish', function() {
      assert.deepEqual(arr, ['bar 1', 'bar 2']);
      done();
    });
  });
});
