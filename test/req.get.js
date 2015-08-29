var hoagie = require('..');
var assert = require('assert');

/* jshint mocha:true */

describe('req.get', function() {
  it('returns values from process.env', function(done) {
    hoagie().use(function(req /*, res */) {
      assert.ok(process.env.SHELL, 'Really? no shell?');
      assert.equal(req.get('SHELL'), process.env.SHELL);
      done();
    }).run([]);
  });
});
