var child = require('./child');
var which = require('./which');
var template = require('./template');
var basename = require('./basename');
var fs = require('fs');

/*
  TODO for real tho
*/
function halp(/* file */) {
  return 'usage here';
}

/**
 * Prints the program usage information and a list
 * of available subcommands. Also handles delegating
 * the `help` command to subcommands.
 */
module.exports = function(req, done) {
  if (!req.command || (!req.command && req.opts.help)) {
    var cp = child();

    /**
     * Find all available subcommands and their usage
     */
    req.commands = which(req.prefix + '*').reduce(function(hsh, file) {
      var name = basename(file, req.prefix);
      var desc = halp(file);

      hsh[name] = desc;

      return hsh;
    }, {});

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
