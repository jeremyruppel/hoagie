var hoagie = require('..');
var invoke = require('./support');

/* jshint mocha:true */

describe('middleware/completion', function() {
  it('passes if there is a command in the request', function(done) {
    var app = hoagie();

    app.use(hoagie.completion());
    app.use(function() {
      done();
    });

    app.run([
      'foo', '--commands'
    ]);
  });
  it('lists the available commands', function(done) {
    var app = hoagie();

    app.use(hoagie.completion());
    app.use(function() {});
    app.use('foo', function() {});
    app.use('bar', function() {});
    app.use('bar', function() {});
    app.use('baz', function() {});

    invoke(app).run([ '--commands' ]).expect('foo\nbar\nbaz\n', done);
  });
  it('prints help for the completion script to a tty', function(done) {
    var app = hoagie();

    // fake like we're a tty for this test
    app.response.__defineGetter__('isTTY', function() {
      return true;
    });

    app.set('program', 'hoagie');
    app.use(hoagie.completion());

    invoke(app)
    .run([ '--completion' ])
    .expect(/Add the following to your profile:/)
    .expect(/eval "\$\(hoagie --completion\)"/, done);
  });
  it('prints the completion script for /bin/bash', function(done) {
    var app = hoagie();

    app.set('program', 'hoagie');
    app.use(hoagie.completion());

    invoke(app)
    .run([ '--completion' ])
    .expect(/complete -F _hoagie_completion hoagie/, done);
  });
});
