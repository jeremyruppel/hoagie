var nixt = require('nixt');
var fixture = require('./fixtures');

describe('help', function() {
  it('prints usage information', function(done) {
    nixt({
      colors: false
    }).cwd('examples/yell')
      .path('examples/yell/bin')
      .stdout(fixture('yell/help.txt'))
      .code(0)
      .run('node index.js --help', done);
  });
  it('is the default command', function(done) {
    nixt({
      colors: false
    }).cwd('examples/yell')
      .path('examples/yell/bin')
      .stdout(fixture('yell/help.txt'))
      .code(0)
      .run('node index.js', done);
  });
  it('runs the subcommand help', function(done) {
    nixt()
      .cwd('examples/yell')
      .path('examples/yell/bin')
      .stdout(fixture('yell/help-loud.txt'))
      .code(0)
      .run('node index.js loud --help', done);
  });
  it('delegates to subcommands help', function(done) {
    nixt()
      .cwd('examples/yell')
      .path('examples/yell/bin')
      .stdout(fixture('yell/help-loud.txt'))
      .code(0)
      .run('node index.js help loud', done);
  });
});
