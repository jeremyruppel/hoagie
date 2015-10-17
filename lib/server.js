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

  this.handler = handler;
}

util.inherits(Server, events.EventEmitter);

Server.prototype.run = function(argv, req, res) {
  var self = this;

  debug('run', argv);

  req.argv = argv;

  res.on('exit', function() {
    process.exitCode = res.exitCode;
    process.nextTick(function() {
      self.emit('finish', process.exitCode);
    });
  });

  process.nextTick(function() {
    debug('start');
    self.emit('start');
    self.handler(req, res);
  });

  return this;
};

module.exports = Server;
