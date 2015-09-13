var hoagie = require('..');
var assert = require('assert');

/* jshint mocha:true */

describe('middleware/init', function() {
  it('adds req.app and res.app', function(done) {
    var app = hoagie();

    // so we can tell we're getting the same
    // application instance back
    app.set('id', Math.random());

    app.use(function(req, res /*, next */) {
      assert.equal(req.app.get('id'), app.get('id'));
      assert.equal(res.app.get('id'), app.get('id'));
      done();
    });

    app.run([
      'help', 'bar'
    ]);
  });
});
