var hoagie = require('..');
var invoke = require('./support');

/* jshint mocha:true */

describe('res.writeln', function() {
  it('writes to process.stdout with a newline', function(done) {
    var app = hoagie();

    app.use(function(req, res) {
      res.writeln('foo');
      res.writeln('bar');
      res.end('baz');
    });

    invoke(app).run([]).expect('foo\nbar\nbaz', done);
  });
});
