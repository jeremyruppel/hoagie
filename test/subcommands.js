var nixt = require('nixt');

describe('subcommands', function() {
  it('executes a subcommand', function(done) {
    nixt()
      .path('examples/yell/bin')
      .cwd('examples/yell')
      .stdout('OHAI!')
      .code(0)
      .run('node index.js loud ohai', done);
  });
  it('executes the file in its own environment', function(done) {
    nixt()
      .path('examples/yell/bin')
      .cwd('examples/yell')
      .stdout('####!')
      .code(0)
      .run('node index.js curse ohai', done);
  });
  it('provides environment variables');
  it('suggests similar commands');
});
