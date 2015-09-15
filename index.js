var Server = require('./lib/server');
var proto = require('./lib/application');
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

  app.request = { app: app, __proto__: hoagie.Request.prototype };
  app.response = { app: app, __proto__: hoagie.Response.prototype };
  app.init();

  app.run = function(argv, stdin, stdout) {
    return hoagie.createServer(app).run(argv, stdin, stdout);
  };

  return app;
};

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
exports.Request = require('./lib/request');
exports.Response = require('./lib/response');

/**
 * Middleware
 */

exports.help = require('./lib/middleware/help');
