var glob = require('glob');
var path = require('path');
var async = require('async');
var flatten = require('flatten');
var uniq = require('uniq');
var debug = require('debug')('menu:find');

/**
 * Looks for files in the current PATH matching the
 * pattern "[program name]-[pattern]", like "git-shell".
 */
module.exports = function(program) {

  /**
   * Find the application PATHs to search for subcommands.
   */
  var paths = process.env.PATH.split(path.delimiter);

  return function(pattern, done) {

    async.map(paths, function(cwd, next) {
      debug('searching path %s', cwd);

      glob(program.name + '-' + pattern, {
        cwd: cwd
      }, next).on('match', function(file) {
        debug('found %s in %s', file, cwd);
      });
    }, function(err, files) {
      done(err, uniq(flatten(files)));
    });
  }
};
