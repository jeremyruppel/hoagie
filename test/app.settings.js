var hoagie = require('..');
var assert = require('assert');

/* jshint mocha:true */

describe('app.settings', function() {
  var app;

  beforeEach(function() {
    app = hoagie();
  });
  it('sets a setting', function() {
    app.set('foo', 'bar');
    assert.equal(app.settings.foo, 'bar');
  });
  it('returns itself from #set', function() {
    assert.equal(app.set('foo', 'bar').get('foo'), 'bar');
  });
  it('gets a setting', function() {
    app.settings.foo = 'bar';
    assert.equal(app.get('foo'), 'bar');
  });
});
