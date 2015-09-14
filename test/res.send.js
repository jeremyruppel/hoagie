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
});
