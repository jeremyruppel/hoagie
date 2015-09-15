var hoagie = require('..');
var invoke = require('./support');

/* jshint mocha:true */

describe('res.send', function() {
  it('writes to process.stdout and ends', function(done) {
    var app = hoagie();

    app.use(function(req, res) {
      res.send('OK');
    });

    invoke(app).run([]).expect('OK\n', done);
  });
  it('formats if arguments are provided', function(done) {
    var app = hoagie();

    app.use(function(req, res) {
      res.send('current status: %s', req.params.status);
    });

    invoke(app)
    .run([ '--status', 'beer' ])
    .expect('current status: beer\n', done);
  });
});
