var Request = require('./request');
var Response = require('./response');
var debug = require('debug')('hoagie:server');

/**
 * Creates a new hoagie server with `handler` as the request
 * handler. Applications are essentially complex `handler`
 * functions.
 * @param {Function} handler
 * @returns {Object}
 */

module.exports = function createServer(handler) {

  function run(argv, stdin, stdout) {
    var req = new Request(argv, stdin || process.stdin);
    var res = new Response(stdout || process.stdout);

    debug('run', req.params);

    res.on('finish', function() {
      process.exitCode = res.exitCode;
    });

    process.nextTick(function() {
      res.emit('start');
      handler(req, res);
    });

    return res;
  }

  return { run: run };
};
