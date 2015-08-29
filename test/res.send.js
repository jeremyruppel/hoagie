var hoagie = require('..');
var assert = require('assert');
var stdio = require('./support');

/* jshint mocha:true */

describe('res.send', function() {
  it('writes to process.stdout', function(done) {
    var stdout = new stdio.Output();
    var app = hoagie();

    app.use(function(req, res) {
      res.send('OK');
    });

    app.run([], stdout).on('finish', function() {
      assert.equal(stdout.data, 'OK\n');
      done();
    });
  });
});
