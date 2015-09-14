var hoagie = require('..');
var invoke = require('./support');

/* jshint mocha:true */

describe('req.pipe', function() {
  it('reads from process.stdin', function(done) {
    var app = hoagie();

    app.use(function(req, res) {
      req.pipe(res);
    });

    invoke(app).run([]).stdin('woot!').expect('woot!', done);
  });
});
