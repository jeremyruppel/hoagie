var events = require('events');
var util = require('util');
var debug = require('debug')('hoagie:server');

/**
 * Creates a new hoagie server with `handler` as the request
 * handler. Applications are essentially complex `handler`
 * functions.
 * @param {Function} handler
 * @constructor
 */

function Server(handler) {
  events.EventEmitter.call(this);

  this.on('run', handler);
}

util.inherits(Server, events.EventEmitter);

Server.prototype.run = function(argv, req, res) {
  var self = this;

  req.argv = argv;

  res.on('exit', function(code) {
    process.exitCode = code;
    process.nextTick(function() {
      self.emit('exit', process.exitCode);
    });
  });

  process.nextTick(function() {
    debug('run', argv);
    self.emit('run', req, res);
  });

  return this;
};

module.exports = Server;
