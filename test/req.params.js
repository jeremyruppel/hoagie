var hoagie = require('..');
var assert = require('assert');

/* jshint mocha:true */

describe('req.params', function() {
  it('is an array', function(done) {
    var app = hoagie();

    app.use(function(req /*, res, next */) {
      assert(Array.isArray(req.params));
      done();
    });

    app.run([]);
  });
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
  it('provides ordinal params', function(done) {
    var app = hoagie();

    app.use('foo', function(req /*, res, next */) {
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
