var server = require('./lib/server');
var Router = require('./lib/router');

exports = module.exports = function hoagie() {
  var router = new Router;

  function app(req, res, next) {
    app.handle(req, res, next);
  }

  app.settings = {};

  app.get = function(key) {
    return this.settings[key];
  };

  app.set = function(key, val) {
    this.settings[key] = val;
    return this;
  };

  app.use = function() {
    router.use.apply(router, arguments);
    return this;
  };

  app.handle = function(req, res, done) {
    router.handle(req, res, done);
  };

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

exports.Router = Router;

/**
 * Middleware
 */

exports.help = require('./lib/middleware/help');
