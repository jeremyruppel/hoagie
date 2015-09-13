var server = require('./lib/server');
var proto = require('./lib/application');
var mixin = require('merge-descriptors');

exports = module.exports = function hoagie() {

  function app(req, res, next) {
    app.handle(req, res, next);
  }

  mixin(app, proto, false);

  app.init();

  app.run = function(argv, stdin, stdout) {
    return hoagie.createServer(app).run(argv, stdin, stdout);
  };

  return app;
};

exports.createServer = function(handler) {
  return server(handler);
};

/**
 * Router
 */

exports.Router = require('./lib/router');

/**
 * Middleware
 */

exports.help = require('./lib/middleware/help');
