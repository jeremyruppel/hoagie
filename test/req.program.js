var hoagie = require('..');
var assert = require('assert');

/* jshint mocha:true */

describe('req.program', function() {
  it('returns the program name', function(done) {
    var app = hoagie();

    app.set('program', 'hoagie');
    app.use(function(req /*, res, next */) {
      assert.equal(req.program, 'hoagie');
      done();
    });

    app.run([]);
  });
});
