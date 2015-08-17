var debug = require('debug')('hoagie:compile');

/**
 * Pattern for required parameters.
 * @type {RegExp}
 */

var REQUIRED = /<(\w+)>/i;

/**
 * Compile the `pattern` string into a function that will
 * either return a params hash from a matching argv or
 * undefined if there is no match.
 * @param {String} pattern The command pattern spec
 * @returns {Function}
 */

module.exports = function compile(pattern) {
  var spec = pattern.trim().split(/\s+/g).map(param);

  debug('spec', spec);

  return function(argv) {
    if (argv.length !== spec.length) {
      return null;
    }

    function evaluate(hsh, val, idx) {
      return spec[idx](hsh, val, idx);
    }

    return argv.reduce(evaluate, {});
  };
};

function param(arg) {
  var match = REQUIRED.exec(arg);
  if (match) {
    return argument(match[1]);
  } else {
    return segment(arg);
  }
}

function argument(arg) {
  return function argument(hsh, val, idx) {
    if (hsh) {
      debug('argument[%s] %s = %s', idx, arg, val);

      hsh[arg] = val;
      hsh[idx] = val;
    }
    return hsh;
  };
}

function segment(arg) {
  return function segment(hsh, val, idx) {
    if (hsh) {
      debug('segment[%s] %s = %s', idx, arg, val);

      hsh[idx] = val;
    }
    return arg === val ? hsh : undefined;
  };
}
