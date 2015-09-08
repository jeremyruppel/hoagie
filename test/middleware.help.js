var hoagie = require('..');
var assert = require('assert');

/* jshint mocha:true */

describe('middleware/help', function() {
  it('rewrites the command and adds the --help flag', function(done) {
    var app = hoagie();

    app.use(hoagie.help());
    app.use('bar', function(req /*, res, next */) {
      assert.equal(req.params[0], 'bar');
      assert.equal(req.params.help, true);
      done();
    });

    app.run([
      'help', 'bar'
    ]);
  });
});
