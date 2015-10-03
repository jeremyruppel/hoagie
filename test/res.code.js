var hoagie = require('..');
var assert = require('assert');
var invoke = require('./support');

/* jshint mocha:true */

describe('res.code', function() {
  it('sets res.exitCode', function(done) {
    var app = hoagie();

    app.use(function(req, res) {
      assert.equal(res.exitCode, 0);
      res.code(128);
      assert.equal(res.exitCode, 128);
      done();
    });

    invoke(app).run([]).end(function() {});
  });
  it('is chainable', function(done) {
    var app = hoagie();

    app.use(function(req, res) {
      assert.equal(res.code(128).exitCode, 128);
      done();
    });

    invoke(app).run([]).end(function() {});
  });
});
