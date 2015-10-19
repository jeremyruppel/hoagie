var hoagie = require('..');
var assert = require('assert');
var invoke = require('./support');

/* jshint mocha:true */

describe('app.response', function() {
  it('exposes the response prototype', function() {
    assert.ok(hoagie.response);
  });
  it('extends the response prototype', function(done) {
    var app = hoagie();

    app.response.beer = function() {
      this.end('🍺');
    };

    app.use(function(req, res /*, next */) {
      res.beer();
    });

    invoke(app).run([]).expect('🍺', done);
  });
  it('does not affect other apps prototypes', function(done) {
    var one = hoagie();
    var two = hoagie();

    one.response.beer = function() {
      this.end('🍺');
    };

    two.response.beer = function() {
      this.end('🍻');
    };

    one.use(function(req, res){
      res.beer();
    });

    invoke(one).run([]).expect('🍺', done);
  });
});
