var server = require('./lib/server');
var Router = require('./lib/router');
var path = require('path');

exports = module.exports = function hoagie() {

  function app(req, res, next) {
    app.handle(req, res, next);
  }

  app.settings = {};

  app.init = function() {
    this._router = new Router();

    this.set('program', path.basename(process.argv[1]));

    return this;
  };

  app.get = function(key) {
    return this.settings[key];
  };

  app.set = function(key, val) {
    this.settings[key] = val;
    return this;
  };

  app.use = function() {
    this._router.use.apply(this._router, arguments);
    return this;
  };

  app.handle = function(req, res, done) {
    this._router.handle(req, res, done);
  };

  app.run = function(argv, stdin, stdout) {
    return hoagie.createServer(app).run(argv, stdin, stdout);
  };

  app.init();

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
