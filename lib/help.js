var table = require('text-table');
var chalk = require('chalk');

/**
 * Prints the program usage information and a list
 * of available subcommands.
 */
module.exports = function(program) {

  /**
   * The routine to find subcommands.
   */
  var find = require('./find')(program);

  /**
   * Removes the program name prefix from a command.
   */
  var strip = require('./strip')(program);

  console.log('usage: %s [command] [--version] [--help]',
    chalk.cyan(program.name));

  find('*', function(err, cmds) {

    cmds = cmds.map(strip)
    .map(function(cmd) {
      return chalk.white.bold(cmd);
    }).map(function(cmd) {
      return [' ', cmd, 'usage here'];
    });

    console.log(table(cmds));

    process.exit(0);
  });
};
