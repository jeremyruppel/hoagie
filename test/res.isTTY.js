var hoagie = require('..');
var assert = require('assert');
var invoke = require('./support');

/* jshint mocha:true */

describe.skip('res.isTTY', function() {
  it('delegates to stdout', function(done) {
    var app = hoagie();

    app.use(function(req, res /*, next */) {
      assert.equal(res.isTTY, process.stdout.isTTY);
      done();
    });

    invoke(app).run([]).end(function() {});
  });
});
