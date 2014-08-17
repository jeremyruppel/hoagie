var nopt = require('nopt');

/**
 *
 */
module.exports = function(package) {
  var opts = nopt({
    version: Boolean,
    help: Boolean
  });

  return {

    /**
     *
     */
    package: require(package),

    /**
     * Parse global command line options
     */
    opts: opts,

    /**
     *
     */
    command: opts.argv.remain[0],

    /**
     *
     */
    args: opts.argv.original.slice(1),

    /**
     *
     */
    get prefix(){
      return this.package.name + '-';
    }
  };
};
