var hoagie = require('..');
var invoke = require('./support');

/* jshint mocha:true */

describe('res.end', function() {
  it('emits the "exit" event', function(done) {
    var app = hoagie();

    app.use(function(req, res) {
      res.on('exit', done);
      res.end();
    });

    invoke(app).run([]).end(function() {});
  });
  it('writes to process.stdout', function(done) {
    var app = hoagie();

    app.use(function(req, res) {
      res.end('🍺');
    });

    invoke(app).run([]).expect('🍺', done);
  });
  it('formats if arguments are provided', function(done) {
    var app = hoagie();

    app.use(function(req, res) {
      res.end('current status: %s', 'beer');
    });

    invoke(app).run([]).expect('current status: beer', done);
  });
});
