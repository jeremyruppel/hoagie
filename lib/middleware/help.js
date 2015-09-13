/**
 * Returns a middleware that modifies the request to treat the `help`
 * subcommand as if the --help flag were passed to the given subcommand.
 * For example, `myapp.js help foo` will be turned into `myapp.js foo --help`.
 * @returns {Function}
 */

module.exports = function help() {
  return function(req, res, next) {
    if (req.command === 'help' && req.params[1]) {
      req.params.shift();
      req.params.help = true;
    }
    next();
  };
};
