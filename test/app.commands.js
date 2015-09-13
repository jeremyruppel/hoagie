var hoagie = require('..');
var assert = require('assert');

/* jshint mocha:true */

describe('app.commands', function() {
  it('returns all registered commands', function() {
    var app = hoagie();

    app.use(function() {}); // ignore anonymous layers
    app.use('foo', function() {});
    app.use('bar', function() {});
    app.use('bar', function() {}); // ignore duplicate commands

    assert.deepEqual(app.commands, [
      'foo', 'bar'
    ]);
  });
});
