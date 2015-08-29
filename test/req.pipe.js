var hoagie = require('..');
var assert = require('assert');
var stdio = require('./support');

/* jshint mocha:true */

describe('req.pipe', function() {
  it('reads from process.stdin', function(done) {
    var stdin = new stdio.Input('woot!');
    var app = hoagie();

    app.use(function(req /*, res */) {
      req.on('data', function(data) {
        assert.equal(String(data), stdin.data);
        done();
      });
    });

    app.run([], stdin);
  });
});
