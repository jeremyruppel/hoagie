var Server = require('./lib/server');
var proto = require('./lib/application');
var req = require('./lib/request');
var res = require('./lib/response');
var mixin = require('merge-descriptors');

/**
 * Creates a new hoagie application.
 * @returns {Object}
 */

exports = module.exports = function hoagie() {

  function app(req, res, next) {
    app.handle(req, res, next);
  }

  mixin(app, proto, false);

  app.request = { app: app, __proto__: req };
  app.response = { app: app, __proto__: res };
  app.init();

  app.run = function(argv) {
    return hoagie.createServer(app).run(argv, process.stdin, process.stdout);
  };

  return app;
};

/**
 * Alias for `process.argv.slice(2)`, which is the
 * argument vector minus the environment and program.
 * @returns {Array}
 */

exports.__defineGetter__('argv', function() {
  return process.argv.slice(2);
});

/**
 * Creates a new hoagie server with `handler` as the request
 * handler. Applications are essentially complex `handler`
 * functions.
 * @param {Function} handler
 * @returns {Object}
 */

exports.createServer = function(handler) {
  return new Server(handler);
};

/**
 * Router
 */

exports.Router = require('./lib/router');
exports.request = req;
exports.response = res;

/**
 * Middleware
 */

exports.help = require('./lib/middleware/help');
exports.completion = require('./lib/middleware/completion');
