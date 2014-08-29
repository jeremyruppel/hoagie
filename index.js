var request = require('./lib/request');
var first = require('./lib/first');
var version = require('./lib/version');
var help = require('./lib/help');
var exec = require('./lib/exec');
var suggest = require('./lib/suggest');

/**
 * Creates and runs a new application described by the given package.json.
 * To create a program, simply put the following in your main file:
 *
 *   require('hoagie')(require('./package'));
 *
 * The program will try the following in order until one succeeds:
 *
 * - Print the application version, if requested
 * - Print application or subcommand help, if requested
 * - Run the specified subcommand, if found
 * - Suggest a subcommand similar to the one requested
 *
 */
module.exports = function(package) {

  /**
   * `req` is the current program's invocation. This contains
   * the information from the package.json as well as the
   * parsed arguments, subcommand, etc.
   */
  var req = request(package);

  /**
   * The list of standard hoagie "middleware".
   */
  var cli = [
    version, // print version information
    help,    // print program help
    exec     // execute subcommands
  ];

  /**
   * Attach the current process to the given child process.
   * When the child process exits, this process will exit
   * with the same status code.
   */
  function attach(cp) {
    process.stdin.pipe(cp.stdin);
    cp.stdout.pipe(process.stdout);
    cp.stderr.pipe(process.stderr);
    cp.on('close', function(code /*, signal */) {
      process.exit(code);
    });
  }

  /**
   * Find the first function that yields a child process and
   * attach this process to it. If no function yields a child
   * process, throw the user a bone and suggest something.
   */
  first(cli, req, function(err, cp) {
    if (err) {
      attach(suggest(req));
    } else {
      attach(cp);
    }
  });
};
