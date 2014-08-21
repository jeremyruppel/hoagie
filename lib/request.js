var assert = require('assert');
var nopt = require('nopt');

/**
 * Given a package.json, returns an object representing the
 * current program invocation context. Also makes some basic
 * assertions about the package.json's schema.
 */
module.exports = function(package) {
  assert.ok(package.name,        'package.json must have a `name`');
  assert.ok(package.description, 'package.json must have a `description`');
  assert.ok(package.subcommands, 'package.json must have a `subcommands` hash');

  /**
   * Parse global command line flags
   */
  var opts = nopt({
    version: Boolean,
    help:    Boolean
  });

  return {

    /**
     * The program's package.json
     */
    package: package,

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
