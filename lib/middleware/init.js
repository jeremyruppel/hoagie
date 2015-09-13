/**
 * Adds a reference to the app to the request and response.
 */

module.exports = function init(app) {
  return function(req, res, next) {
    req.app = app;
    res.app = app;
    next();
  };
};
