/**
 * Inserts this app's request and response prototypes
 * into the prototype chain for this request.
 */

module.exports = function init(app) {
  return function(req, res, next) {
    req.__proto__ = app.request;
    res.__proto__ = app.response;
    next();
  };
};
