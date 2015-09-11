var hoagie = require('..');
var assert = require('assert');

/* jshint mocha:true */

describe('app.init', function() {
  var app;

  beforeEach(function() {
    app = hoagie().init();
  });
  it('creates a new router', function() {
    assert.ok(app._router);
  });
  it('sets the program basename', function() {
    assert.equal(app.get('program'), '_mocha');
  });
});
