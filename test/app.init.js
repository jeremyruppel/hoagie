var hoagie = require('..');
var assert = require('assert');

/* jshint mocha:true */

describe('app.init', function() {
  var argv = process.argv.slice();
  var app;

  beforeEach(function() {
    app = hoagie();
  });
  afterEach(function() {
    process.argv = argv;
  });
  it('creates a new router', function() {
    assert.ok(app.init()._router);
  });
  it('sets the program basename', function() {
    process.argv[1] = __filename;

    assert.equal(app.init().get('program'), 'app.init');
  });
});
