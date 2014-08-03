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
   * The subcommand prefix.
   */
  var prefix = new RegExp('^' + program.name + '-');

  console.log('usage: %s [command] [--version] [--help]',
    chalk.cyan(program.name));

  find('*', function(err, cmds) {

    cmds = cmds.map(function(cmd) {
      return cmd.replace(prefix, '');
    }).map(function(cmd) {
      return chalk.white.bold(cmd);
    }).map(function(cmd) {
      return [' ', cmd, 'usage here'];
    });

    console.log(table(cmds));

    process.exit(0);
  });
};
