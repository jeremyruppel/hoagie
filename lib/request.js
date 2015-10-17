exports = module.exports = {
  __proto__: process.stdin.__proto__
};

/**
 * Returns the value of the environment variable `name`.
 * @param {String} name
 * @returns {String|undefined}
 */

exports.get = function(name) {
  return process.env[name];
};

/**
 * Returns the program name.
 * @returns {String}
 */

exports.__defineGetter__('program', function() {
  return this.app.get('program');
});

/**
 * Returns the command name. This is a synonym for the
 * first ordinal param.
 * @returns {String}
 */

exports.__defineGetter__('command', function() {
  return this.params[0];
});
