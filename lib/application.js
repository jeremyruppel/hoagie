var Router = require('./router');
var init = require('./middleware/init');
var path = require('path');

/**
 * Initialize this application with a router instance
 * and the default settings.
 * @returns {Object} this
 */

this.init = function() {
  this._router = new Router();

  this.settings = {};

  this.set('program', path.basename(process.argv[1]));

  this.use(init(this));

  return this;
};

/**
 * Return the value of the `name` setting.
 * @param {String} name The name of the setting
 * @returns {Object} The setting value
 */

this.get = function(name) {
  return this.settings[name];
};

/**
 * Set the setting `name` to `value`.
 * @param {String} name The name of the setting
 * @param {Object} value The new setting value
 * @returns {Object} this
 */

this.set = function(name, value) {
  this.settings[name] = value;
  return this;
};

/**
 * Add middleware or routes to this application.
 * @see ./router.js#use
 * @returns {Object} this
 */

this.use = function() {
  this._router.use.apply(this._router, arguments);
  return this;
};

/**
 * Send the given request and response through this
 * application's routing stack.
 * @param {Request} req The hoagie request
 * @param {Response} res The hoagie response
 * @param {Function} [done] The callback function
 * @returns null
 */

this.handle = function(req, res, done) {
  this._router.handle(req, res, done);
};
