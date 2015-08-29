var hoagie = require('..');
var assert = require('assert');

/* jshint mocha:true */

describe('router', function() {
  it('runs middleware that match the command', function(done) {
    hoagie().use('foo', function() {
      done(new Error('Middleware should not have been called'));
    }).use('bar', function() {
      done();
    }).run([
      'bar'
    ]);
  });
  it('runs all middleware that match the command', function(done) {
    var arr = [];

    hoagie().use('foo', function(/* req, res, next */) {
      done(new Error('Middleware should not have been called'));
    }).use('bar', function(req, res, next) {
      arr.push('bar 1');
      next();
    }).use('bar', function(req, res, next) {
      arr.push('bar 2');
      next();
    }).run([
      'bar'
    ]).on('finish', function() {
      assert.deepEqual(arr, ['bar 1', 'bar 2']);
      done();
    });
  });
});
