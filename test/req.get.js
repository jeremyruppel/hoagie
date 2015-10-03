var hoagie = require('..');
var assert = require('assert');
var invoke = require('./support');

/* jshint mocha:true */

describe('req.get', function() {
  it('returns values from process.env', function(done) {
    var app = hoagie();

    app.use(function(req /*, res */) {
      assert.ok(process.env.SHELL, 'Really? no shell?');
      assert.equal(req.get('SHELL'), process.env.SHELL);
      done();
    });

    invoke(app).run([]).end(function() {});
  });
});
