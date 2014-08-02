var debug = require('debug')('menu');

/**
 * Parse global command line options.
 */
var opts = require('nopt')({
  'version': Boolean,
  'help': Boolean
});

/**
 *
 */
module.exports = function(package) {

  /**
   * Require the parent module's package.json.
   */
  var program = require(package);

  /**
   * Determine the subcommand to run.
   */
  var command = opts.argv.cooked[0];

  /**
   * The arguments to pass to the subcommand.
   */
  var args = opts.argv.original.slice(1);

  /**
   * The routine to find subcommands.
   */
  var find = require('./lib/find')(program);

  /**
   * The routine to execute subcommands.
   */
  var exec = require('./lib/exec')(program);

  /**
   * If the --version flag is set, run the 'version' subcommand.
   */
  if (opts.version) {
    process.exit(require('./lib/version')(program));
  }

  /**
   * If the --help flag is set, print the help and exit.
   */
  if (opts.help || !command) {
    process.exit(require('./lib/help')(program));
  }

  debug('program=%s', program.name);
  debug('command=%s', command);

  find(command, function(err, cmds) {
    if (cmds.length) {
      exec(cmds[0], args);
    } else {
      throw 'CANT FIND THAT COMMAND';
    }
  });
};
