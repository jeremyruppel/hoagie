var Router = require('./router');
var path = require('path');

this.init = function() {
  this._router = new Router();

  this.settings = {};

  this.set('program', path.basename(process.argv[1]));

  return this;
};

this.get = function(key) {
  return this.settings[key];
};

this.set = function(key, val) {
  this.settings[key] = val;
  return this;
};

this.use = function() {
  this._router.use.apply(this._router, arguments);
  return this;
};

this.handle = function(req, res, done) {
  this._router.handle(req, res, done);
};
