var hoagie = require('..');
var invoke = require('./support');

/* jshint mocha:true */

describe('app.handle', function() {
  it('exits zero by default', function (done) {
    var app = hoagie();

    app.use(function(req, res, next) { // jshint ignore:line
      next();
    });

    invoke(app).run([]).expect(0, done);
  });
  it('exits nonzero if there is an error');
  it('exits with the error code if present');
});
