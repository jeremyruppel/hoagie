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
  var command = opts.argv.remain[0];

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
   * If the --version flag is set, print the version and exit.
   */
  if (opts.version) {
    process.exit(require('./lib/version')(program));
  }

  /**
   * If the --help flag is set, print the help and exit.
   */
  if (!command || (!command && opts.help)) {
    process.exit(require('./lib/help')(program));
  }

  /**
   * If the 'help' command is run, swap the first argument
   * for the command name and run it with --help.
   */
  if (command === 'help') {
    command = args[0];
    args[0] = '--help';
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
