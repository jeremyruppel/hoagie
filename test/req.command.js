var hoagie = require('..');
var assert = require('assert');

/* jshint mocha:true */

describe('req.command', function() {
  it('returns the subcommand', function(done) {
    var app = hoagie();

    app.use(function(req /*, res, next */) {
      assert.equal(req.command, 'foo');
      assert.equal(req.command, req.params[0]);
      done();
    });

    app.run([
      'foo', 'bar'
    ]);
  });
});
