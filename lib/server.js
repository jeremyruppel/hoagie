var minimist = require('minimist');
var stream = require('stream');
var Response = require('./response');
var debug = require('debug')('hoagie:server');

module.exports = function createServer(handler) {

  function run(argv, stdout) {
    var req = new stream.PassThrough;
    var res = new Response(stdout || process.stdout);

    req.params = minimist(argv);

    debug('run', req.params);

    process.nextTick(function() {
      res.emit('start');
      handler(req, res);
    });

    return res;
  }

  return { run: run };
};
