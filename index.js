var debug = require('debug')('hoagie');

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
   * The routine to suggest subcommands.
   */
  var suggest = require('./lib/suggest')(program);

  /**
   * If the --version flag is set, print the version and exit.
   */
  if (opts.version) {
    return require('./lib/version')(program);
  }

  /**
   * If the --help flag is set, print the help and exit.
   */
  if (!command || (!command && opts.help)) {
    return require('./lib/help')(program);
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
    var cmd = cmds[0];
    if (cmd) {
      exec(cmd, args);
    } else {
      suggest(command);
    }
  });
};
