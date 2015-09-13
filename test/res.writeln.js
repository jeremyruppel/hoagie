var hoagie = require('..');
var assert = require('assert');
var stdio = require('./support');

/* jshint mocha:true */

describe('res.writeln', function() {
  it('writes to process.stdout with a newline', function(done) {
    var stdout = new stdio.Output();
    var app = hoagie();

    app.use(function(req, res) {
      res.writeln('foo');
      res.writeln('bar');
      res.end('baz');
    });

    app.run([], null, stdout).on('finish', function() {
      assert.equal(stdout.data, 'foo\nbar\nbaz');
      done();
    });
  });
});
