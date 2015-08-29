var hoagie = require('..');
var assert = require('assert');

/* jshint mocha:true */

describe('app.settings', function() {
  var app;

  beforeEach(function() {
    app = hoagie();
  });
  it('is an object', function() {
    assert.deepEqual(app.settings, {});
  });
  it('sets a setting', function() {
    app.set('foo', 'bar');
    assert.equal(app.settings.foo, 'bar');
  });
  it('gets a setting', function() {
    app.settings.foo = 'bar';
    assert.equal(app.get('foo'), 'bar');
  });
});
