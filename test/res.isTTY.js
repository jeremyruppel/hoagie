var hoagie = require('..');
var assert = require('assert');

/* jshint mocha:true */

describe('res.isTTY', function() {
  it('delegates to stdout', function(done) {
    var app = hoagie();

    app.use(function(req, res /*, next */) {
      assert.equal(res.isTTY, process.stdout.isTTY);
      done();
    });

    app.run([]);
  });
});
