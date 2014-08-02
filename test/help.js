var nixt = require('nixt');

describe('help', function() {
  it('prints usage information', function(done) {
    nixt()
      .cwd('examples/yell')
      .path('examples/yell/bin')
      .stdout('usage: yell [--version] [--help]')
      .code(0)
      .run('node index.js --help', done);
  });
  it('is the default command', function(done) {
    nixt()
      .cwd('examples/yell')
      .path('examples/yell/bin')
      .stdout('usage: yell [--version] [--help]')
      .code(0)
      .run('node index.js', done);
  });
  it('runs the subcommand help', function(done) {
    nixt()
      .cwd('examples/yell')
      .path('examples/yell/bin')
      .stdout('usage: yell loud')
      .code(0)
      .run('node index.js loud --help', done);
  });
  it('delegates to subcommands help', function(done) {
    nixt()
      .cwd('examples/yell')
      .path('examples/yell/bin')
      .stdout('usage: yell loud')
      .code(0)
      .run('node index.js help loud', done);
  });
});
