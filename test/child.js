var subject = require('../lib/child');
var assert = require('assert');

describe('child', function() {
  var events = require('events');
  var stream = require('stream');

  it('is an EventEmitter', function() {
    assert.ok(subject() instanceof events.EventEmitter,
      'Expected an EventEmitter');
  });
  it('has a stdout stream', function() {
    assert.ok(subject().stdout instanceof stream.PassThrough,
      'Expected a stream.PassThrough');
  });
  it('has a stderr stream', function() {
    assert.ok(subject().stderr instanceof stream.PassThrough,
      'Expected a stream.PassThrough');
  });
});
