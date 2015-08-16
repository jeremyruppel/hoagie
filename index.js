var server = require('./lib/server');

exports = module.exports = function hoagie() {
  var stack = [];

  function app(req, res, next) {
    app.handle(req, res, next);
  }

  app.use = function(fn) {
    stack.push(fn);
  };

  app.handle = function(/* req, res, done */) {
    /*
      TODO
    */
  };

  app.run = function(argv) {
    return hoagie.createServer(app).run(argv);
  };

  return app;
};

exports.createServer = function(handler) {
  return server(handler);
};
