var Request = require('./request');
var Response = require('./response');
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

Server.prototype.run = function(argv, stdin, stdout) {
  var req = new Request(argv, stdin || process.stdin);
  var res = new Response(stdout || process.stdout);
  var self = this;

  debug('run', req.params);

  res.on('finish', function() {
    process.exitCode = res.exitCode;
  });
  res.on('finish', function() {
    process.nextTick(function() {
      self.emit('finish');
    });
  });

  process.nextTick(function() {
    self.emit('start');
    self.handler(req, res);
  });

  return this;
};

module.exports = Server;
