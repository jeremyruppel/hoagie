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
  it('exits nonzero if there is an error', function (done) {
    var app = hoagie();

    app.use(function(req, res, next) { // jshint ignore:line
      next(new Error('boom'));
    });

    invoke(app).run([]).expect(8, done);
  });
  it('exits with the error code if present', function (done) {
    var app = hoagie();

    app.use(function(req, res, next) { // jshint ignore:line
      var err = new Error('boom');
      err.code = 128;
      next(err);
    });

    invoke(app).run([]).expect(128, done);
  });
});
