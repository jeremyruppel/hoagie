var events = require('events');
var stream = require('stream');

/**
 * Returns an event emitter that has pass through streams
 * for stdin and stderr, like the `ChildProcess` interface.
 */
module.exports = function() {
  var child = new events.EventEmitter;

  child.stdout = new stream.PassThrough;
  child.stderr = new stream.PassThrough;

  return child;
};
