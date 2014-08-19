var which = require('./which');
var spawn = require('child_process').spawn;

/**
 * Spawns a child process for the given command. Program-specific
 * information is provided as environment variables.
 */
module.exports = function(req, done) {
  var cmd = which(req.prefix + req.command)[0];

  if (cmd) {
    process.env['HOAGIE_NAME'] = req.package.name;
    process.env['HOAGIE_VERSION'] = req.package.version;
    process.env['HOAGIE_COMMAND'] = req.command;

    done(null, spawn(cmd, req.args, {
      cwd: process.cwd(),
      env: process.env,
      stdio: 'pipe'
    }));
  } else {
    done();
  }
};
