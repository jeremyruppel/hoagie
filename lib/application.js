var Router = require('./router');
var init = require('./middleware/init');
var path = require('path');
var fs = require('fs');
var vm = require('vm');

/**
 * Returns the basename of `file` without the extname.
 * @param {String} file
 * @returns {String}
 */

function basename(file) {
  return path.basename(file, path.extname(file));
}

/**
 * Initialize this application with a router instance
 * and the default settings.
 * @returns {Object} this
 */

this.init = function() {
  this._router = new Router();

  this.settings = {};
  this.locals = { settings: this.settings };

  this.set('program', basename(process.argv[1]));

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

/**
 * Render the given view `file` using `locals` as
 * a context. The `locals` given will use this
 * application's locals as a prototype.
 * @param {String} file The path to the view file
 * @param {Object} [locals] The locals hash
 * @returns {String}
 * @throws
 */

this.render = function(file, locals) {
  locals = locals || {};
  locals.__proto__ = this.locals;

  var str = fs.readFileSync(file, 'utf8');
  var ctx = vm.createContext(locals);
  var rex = new RegExp('{{(.*?)}}', 'g');

  return str.replace(rex, function(_, expr) {
    return vm.runInContext(expr, ctx);
  });
};
