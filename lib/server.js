var stream = require('stream');

module.exports = function createServer(handler) {

  function run(/* argv */) {
    var req = new stream.Readable;
    var res = new stream.Writable;

    handler(req, res, end);
  }

  function end() {
    console.log('end!');
  }

  return { run: run };
};
