var merge = require('merge-descriptors');
var parse = require('minimist');

/**
 * Inserts this app's request and response prototypes
 * into the prototype chain for this request. Also provides
 * the params array/hash on the request and sets the default
 * exit status code to zero.
 * @returns {Function}
 */

module.exports = function (app) {
  return function init(req, res, next) {
    req.__proto__ = app.request;
    res.__proto__ = app.response;

    if (!req.params) {
      req.params = extend(parse(req.argv));
    }

    res.exitCode = 0;

    next();
  };

  function extend(argv) {
    return merge(argv._, argv);
  }

};
