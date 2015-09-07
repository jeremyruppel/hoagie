var debug = require('debug')('hoagie:router');

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

  router.use = function(command) {
    var fns = slice(arguments);

    // app.use(fn) for middleware layers
    if (typeof command === 'string') {
      command = fns.shift();
    } else {
      command = null;
    }

    for (var i = 0; i < fns.length; i++) {
      // if there's a command, route it, otherwise just add a layer
      if (command) {
        stack.push(route(command, fns[i]));
      } else {
        stack.push(layer(fns[i]));
      }
    }
  };

  router.handle = function(req, res, done) {
    handle(req, res, done);
  };

  return router;
};

function restore(req, command, next) {
  return function() {
    debug('sub-app unshift');
    /*
      TODO err
    */
    req.params.unshift(command);
    next();
  };
}

function route(command, handler) {
  return function(req, res, next) {
    if (req.command === command) {
      if (handler.use && handler.run) {
        debug('sub-app shift');
        next = restore(req, req.params.shift(), next);
      }
      handler(req, res, next);
    } else {
      next();
    }
  };
}

function layer(handler) {
  return function(req, res, next) {
    if (handler.use && handler.run) {
      debug('sub-app shift');
      next = restore(req, req.params.shift(), next);
    }
    handler(req, res, next);
  };
}

function slice(args) {
  return [].slice.call(args);
}
