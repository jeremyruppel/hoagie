var debug = require('debug')('hoagie:router');

module.exports = function Router() {
  var stack = [];
  var error = [];

  function router(req, res, next) {
    router.handle(req, res, next);
  }

  function handle(req, res, done) {
    if (!done) {
      done = function() { res.end(); };
    }

    function nextStack(err) {
      debug('nextStack', err);

      if (err) {
        return next(err);
      }

      var fn = stack.shift();
      if (fn) {
        fn(req, res, next);
      } else {
        done();
      }
    }

    function nextError(err) {
      debug('nextError', err);

      var fn = error.shift();
      if (fn) {
        fn(err, req, res, next);
      } else {
        done();
      }
    }

    function next(err) {
      debug('next', err);

      if (err) {
        nextError(err);
      } else {
        nextStack();
      }
    }

    next();
  }

  router.use = function(command) {
    var fns = slice(arguments);
    var arr;

    // app.use(fn) for middleware layers
    if (typeof command === 'string') {
      command = fns.shift();
    } else {
      command = null;
    }

    for (var i = 0; i < fns.length; i++) {
      // determine which stack to add the handler to
      arr = fns[i].length === 4 ? error : stack;

      // if there's a command, route it, otherwise just add a layer
      if (command) {
        arr.push(route(command, fns[i]));
      } else {
        arr.push(layer(fns[i]));
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
  debug('route', command);

  return function(/* [err, ]req, res, next */) {
    if (handler.length === 4) {
      errorHandler.apply(null, arguments);
    } else {
      routeHandler.apply(null, arguments);
    }
  };

  function routeHandler(req, res, next) {
    if (req.command === command) {
      if (handler.use && handler.run) {
        debug('sub-app shift');
        next = restore(req, req.params.shift(), next);
      }
      handler(req, res, next);
    } else {
      next();
    }
  }

  function errorHandler(err, req, res, next) {
    handler(err, req, res, next);
  }
}

function layer(handler) {
  debug('layer');

  return function(/* [err, ]req, res, next */) {
    if (handler.length === 4) {
      errorHandler.apply(null, arguments);
    } else {
      routeHandler.apply(null, arguments);
    }
  };

  function routeHandler(req, res, next) {
    if (handler.use && handler.run) {
      debug('sub-app shift');
      next = restore(req, req.params.shift(), next);
    }
    handler(req, res, next);
  }

  function errorHandler(err, req, res, next) {
    handler(err, req, res, next);
  }
}

function slice(args) {
  return [].slice.call(args);
}
