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

    /**
     * Removes the program name prefix from a command.
     */
    var strip = require('./strip')(program);

    process.env['MENU_NAME'] = program.name;
    process.env['MENU_VERSION'] = program.version;
    process.env['MENU_COMMAND'] = strip(command);

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
