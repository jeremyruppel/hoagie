var request = require('./lib/request');
var first = require('./lib/first');
var version = require('./lib/version');
var help = require('./lib/help');
var exec = require('./lib/exec');
var suggest = require('./lib/suggest');
var debug = require('debug')('hoagie');

/**
 *
 */
module.exports = function(package) {
  var req = request(package);
  var cli = [
    version, // print version information
    help,    // print program help
    exec     // execute subcommands
  ];

  /**
   *
   */
  function attach(cp) {
    cp.stdout.pipe(process.stdout);
    cp.stderr.pipe(process.stderr);
    cp.on('exit', function(code, signal) {
      process.exit(code);
    });
  }

  /**
   *
   */
  first(cli, req, function(err, cp) {
    if (err) {
      attach(suggest(req));
    } else {
      attach(cp);
    }
  });
};
