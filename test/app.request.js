var hoagie = require('..');
var assert = require('assert');
var invoke = require('./support');

/* jshint mocha:true */

describe('app.request', function() {
  it('exposes the request class', function() {
    assert.ok(hoagie.Request);
  });
  it('extends the request prototype', function(done) {
    var app = hoagie();

    app.request.beer = function() {
      return '🍺';
    };

    app.use(function(req, res /*, next */) {
      res.end(req.beer());
    });

    invoke(app).run([]).expect('🍺', done);
  });
  it('does not affect other apps prototypes', function(done) {
    var one = hoagie();
    var two = hoagie();

    one.request.beer = function() {
      return '🍺';
    };

    two.request.beer = function() {
      return '🍻';
    };

    one.use(function(req, res){
      res.end(req.beer());
    });

    invoke(one).run([]).expect('🍺', done);
  });
});
