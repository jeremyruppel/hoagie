var spawn = require('child_process').spawn;
var debug = require('debug')('hoagie:exec');

/**
 * Spawns a child process for the given command. Program-specific
 * information is provided as environment variables.
 */
module.exports = function(program) {

  return function(command, args) {
    debug('executing %s', command);
    debug('arguments %s', args);

    /**
     * Removes the program name prefix from a command.
     */
    var strip = require('./strip')(program);

    process.env['HOAGIE_NAME'] = program.name;
    process.env['HOAGIE_VERSION'] = program.version;
    process.env['HOAGIE_COMMAND'] = strip(command);

    return spawn(command, args, {
      cwd: process.cwd(),
      env: process.env,
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
