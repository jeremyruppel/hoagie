module.exports = function Router() {
  var stack = [];

  function router(req, res, next) {
    router.handle(req, res, next);
  }

  function handle(req, res, done) {
    if (!done) {
      done = function() { res.end(); };
    }

    function next(err) {
      if (err) {
        return done(err);
      }

      var fn = stack.shift();
      if (fn) {
        fn(req, res, next);
      } else {
        done();
      }
    }

    next();
  }

  router.use = function(command, handler) {
    if (typeof arguments[0] === 'string') {
      stack.push(route(command, handler));
    } else {
      stack.push(layer(command));
    }
  };

  router.handle = function(req, res, done) {
    handle(req, res, done);
  };

  return router;
};

function route(command, handler) {
  return function(req, res, next) {
    if (req.command === command) {
      handler(req, res, next);
    } else {
      next();
    }
  };
}

function layer(handler) {
  return function(req, res, next) {
    handler(req, res, next);
  };
}
