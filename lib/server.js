var minimist = require('minimist');
var stream = require('stream');
var debug = require('debug')('hoagie:server');

module.exports = function createServer(handler) {

  function run(argv) {
    var req = new stream.PassThrough;
    var res = new stream.PassThrough;

    req.params = minimist(argv);

    debug('run', req.params);

    res.exitCode = 0;

    res.pipe(process.stdout);

    res.on('end', function() {
      process.exitCode = res.exitCode;
    });

    process.nextTick(function() {
      handler(req, res);
    });

    return res;
  }

  return { run: run };
};
