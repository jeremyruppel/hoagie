var child = require('./child');
var which = require('./which');
var template = require('./template');
var basename = require('./basename');
var fs = require('fs');

/**
 * Prints the program usage information and a list
 * of available subcommands. Also handles delegating
 * the `help` command to subcommands.
 */
module.exports = function(req, done) {
  if (!req.command || (!req.command && req.opts.help)) {
    var cp = child();

    /**
     * Find all available subcommands
     */
    req.commands = which(req.prefix + '*').map(function(file) {
      return basename(file, req.prefix);
    });

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
