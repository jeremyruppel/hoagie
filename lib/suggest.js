var child = require('./child');
var which = require('./which');
var template = require('./template');
var didyoumean = require('didyoumean');
var pathmap = require('pathmap');
var fs = require('fs');

/**
 *
 */
module.exports = function(req) {
  var cp = child();

  /**
   * Find all available subcommands
   */
  req.commands = which(req.prefix + '*').map(function(file) {
    return pathmap(file, '%n').replace(req.prefix, '');
  });

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
