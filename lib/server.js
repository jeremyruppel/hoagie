var stream = require('stream');

module.exports = function createServer(handler) {

  function run(/* argv */) {
    var req = new stream.PassThrough;
    var res = new stream.PassThrough;

    res.exitCode = 0;

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
