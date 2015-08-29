var Request = require('./request');
var Response = require('./response');
var debug = require('debug')('hoagie:server');

module.exports = function createServer(handler) {

  function run(argv, stdin, stdout) {
    var req = new Request(argv, stdin || process.stdin);
    var res = new Response(stdout || process.stdout);

    debug('run', req.params);

    process.nextTick(function() {
      res.emit('start');
      handler(req, res);
    });

    return res;
  }

  return { run: run };
};
