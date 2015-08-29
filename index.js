var server = require('./lib/server');
var Router = require('./lib/router');

exports = module.exports = function hoagie() {
  var router = new Router;

  function app(req, res, next) {
    app.handle(req, res, next);
  }

  app.use = function() {
    router.use.apply(router, arguments);
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
