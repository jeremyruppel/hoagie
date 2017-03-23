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
  it('writes a single newline if no arguments are provided', function(done) {
    var app = hoagie();

    app.use(function(req, res) {
      res.write('foo');
      res.writeln();
      res.end('bar');
    });

    invoke(app).run([]).expect('foo\nbar', done);
  });
  it('formats if arguments are provided', function(done) {
    var app = hoagie();

    app.use(function(req, res) {
      res.writeln('current status: %s', req.params.status);
      res.end();
    });

    invoke(app)
    .run([ '--status', 'beer' ])
    .expect('current status: beer\n', done);
  });
});
