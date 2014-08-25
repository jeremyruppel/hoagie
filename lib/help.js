var child = require('./child');
var which = require('./which');
var template = require('./template');
var basename = require('./basename');
var fs = require('fs');

/**
 * Returns whether or not to display the help text for `req`:
 * - If there is no subcommand
 * - If there is no subcommand and the --help flag is passed
 * - If the subcommand is 'help' and there are no arguments afterwards
 */
function help(req) {
  return !req.command // default when no subcommand
    || (!req.command && req.opts.help) // --help flag and no subcommand
    || (!req.args[0] && req.command === 'help'); // 'help' and no arguments
}

/**
 * Prints the program usage information and a list
 * of available subcommands. Also handles delegating
 * the `help` command to subcommands.
 */
module.exports = function(req, done) {
  if (help(req)) {
    var cp = child();

    /**
     * Find all available subcommands
     */
    req.commands = which(req.prefix + '*').map(function(file) {
      return basename(file, req.prefix);
    });

    /**
     * Returns the help text for `command`
     */
    req.help = function(command) {
      return req.package.subcommands[command];
    };

    fs.createReadStream(__dirname + '/views/help.ejs')
      .pipe(template(req))
      .pipe(cp.stdout)
      .on('end', function() {
        cp.emit('exit', 0);
      });

    done(null, cp);
  } else if (req.command === 'help') {
    req.command = req.args[0];
    req.args[0] = '--help';
    done();
  } else {
    done();
  }
};
