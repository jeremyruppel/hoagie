var compile = require('../lib/compile');
var assert = require('assert');

/* jshint mocha:true */

describe('compile', function() {
  it('matches a command', function() {
    var match = compile('foo');

    assert.deepEqual(match(['bar']), null);
    assert.deepEqual(match(['foo']), {
      // ordinal params
      0: 'foo'
    });
  });
  it('matches required arguments', function() {
    var match = compile('foo <bar>');

    assert.deepEqual(match(['foo']), null);
    assert.deepEqual(match(['foo', 'woot', 'nope']), null);
    assert.deepEqual(match(['foo', 'woot']), {
      // ordinal params
      0: 'foo',
      1: 'woot',
      // named params
      bar: 'woot'
    });
  });
  it('matches multiple required arguments', function() {
    var match = compile('foo <bar> <baz>');

    assert.deepEqual(match(['foo']), null);
    assert.deepEqual(match(['foo', 'woot']), null);
    assert.deepEqual(match(['foo', 'woot', 'yay']), {
      // ordinal params
      0: 'foo',
      1: 'woot',
      2: 'yay',
      // named params
      bar: 'woot',
      baz: 'yay'
    });
  });
});
