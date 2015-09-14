var hoagie = require('..');
var invoke = require('./support');

/* jshint mocha:true */

describe('res.render', function() {
  it('renders the given view', function(done) {
    var app = hoagie().set('program', 'hoagie');

    app.use(function(req, res) {
      res.render(__dirname + '/fixtures/test.txt');
    });

    invoke(app).run([]).expect('Hello from hoagie!\n', done);
  });
});
