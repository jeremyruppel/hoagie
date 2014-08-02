var spawn = require('child_process').spawn;
var debug = require('debug')('menu:exec');

/**
 * Spawns a child process for the given command. Program-specific
 * information is provided as environment variables.
 */
module.exports = function(program) {

  return function(command, args) {
    debug('executing %s', command);
    debug('arguments %s', args);

    return spawn(command, args, {
      cwd: process.cwd(),
      stdio: 'inherit'
    }).on('error', function(err) {
      this.emit(err.errno, err);
    }).on('error', function(err) {
      throw err;
    }).on('EACCES', function() {
      debug('error! %s is not executable', command);
    });
  }
};
