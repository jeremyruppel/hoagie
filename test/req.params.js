var hoagie = require('..');
var assert = require('assert');

/* jshint mocha:true */

describe('req.params', function() {
  it('provides named params from flags', function(done) {
    var app = hoagie();

    app.use(function(req /*, res, next */) {
      assert.equal(req.params.foo, 'bar');
      assert.equal(req.params.baz, 'yay');
      done();
    });

    app.run([
      '--foo', 'bar', '--baz=yay', 'woot'
    ]);
  });
  it('provides named params from the spec', function(done) {
    var app = hoagie();

    app.use('foo <bar> <baz>', function(req /*, res, next */) {
      assert.equal(req.params.bar, 'omg');
      assert.equal(req.params.baz, 'yay');
      done();
    });

    app.run([
      'foo', '--woot=true', 'omg', 'yay'
    ]);
  });
  it('provides ordinal params', function(done) {
    var app = hoagie();

    app.use('foo <bar> <baz>', function(req /*, res, next */) {
      assert.equal(req.params[0], 'foo');
      assert.equal(req.params[1], 'omg');
      assert.equal(req.params[2], 'yay');
      done();
    });

    app.run([
      'foo', '--woot=true', 'omg', 'yay'
    ]);
  });
});
