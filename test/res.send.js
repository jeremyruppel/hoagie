var hoagie = require('..');
var assert = require('assert');
var Output = require('./output');

/* jshint mocha:true */

describe('res.send', function() {
  it('writes to process.stdout', function(done) {
    var app = hoagie();
    var out = new Output();

    app.use(function(req, res) {
      res.send('OK');
    });

    app.run([], out).on('finish', function() {
      assert.equal(out.data, 'OK\n');
      done();
    });
  });
});
