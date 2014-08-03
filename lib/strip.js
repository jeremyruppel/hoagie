/**
 * Removes the program name prefix from `str`.
 */
module.exports = function(program) {

  /**
   * The subcommand prefix.
   */
  var prefix = new RegExp('^' + program.name + '-');

  return function(str) {
    return str.replace(prefix, '');
  }
};
