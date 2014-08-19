var child = require('./child');
var which = require('./which');
var template = require('./template');
var basename = require('./basename');
var didyoumean = require('didyoumean');
var fs = require('fs');

/**
 * This is essentially the 404 page of the program. Creates a
 * child process that will find all available subcommands and
 * will make suggestions to the user if the subcommand they
 * requested is similar enough to an existing subcommand.
 */
module.exports = function(req) {
  var cp = child();

  /**
   * Find all available subcommands
   */
  req.commands = which(req.prefix + '*').map(function(file) {
    return basename(file, req.prefix);
  }).concat('version', 'help');

  /**
   * Suggest a subcommand if it is similar enough
   */
  req.suggestion = didyoumean(req.command, req.commands);

  fs.createReadStream(__dirname + '/views/suggest.ejs')
    .pipe(template(req))
    .pipe(cp.stderr)
    .on('end', function() {
      cp.emit('exit', 1);
    });

  return cp;
};
