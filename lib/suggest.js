var didyoumean = require('didyoumean');
var table = require('text-table');
var chalk = require('chalk');

/**
 *
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

  return function(command) {

    console.warn("%s: '%s' is not a %s command. See '%s --help'.",
      chalk.red(program.name),
      chalk.cyan(command),
      program.name,
      program.name);

    find('*', function(err, cmds) {

      cmds = cmds.map(strip);

      var suggestion = didyoumean(command, cmds);
      if (suggestion) {
        console.warn();
        console.warn('Did you mean this?');
        console.warn('  %s', chalk.white.bold(suggestion));
      }

      process.exit(1);
    });
  }
};
