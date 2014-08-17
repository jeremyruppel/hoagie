var nopt = require('nopt');

/**
 * Given a path to a package.json, returns an object
 * representing the current program invocation context.
 */
module.exports = function(package) {

  /**
   *
   */
  var opts = nopt({
    version: Boolean,
    help:    Boolean
  });

  return {

    /**
     * The program's package.json
     */
    package: require(package),

    /**
     * Parse global command line options
     */
    opts: opts,

    /**
     * The invoked subcommand
     */
    command: opts.argv.remain[0],

    /**
     * Any arguments after the subcommand
     */
    args: opts.argv.original.slice(1),

    /**
     * The program name prefix
     */
    get prefix(){
      return this.package.name + '-';
    }
  };
};
