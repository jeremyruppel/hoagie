var nixt = require('nixt');

describe('subcommands', function() {
  it('executes a subcommand', function(done) {
    nixt()
      .cwd('examples/yell')
      .path('examples/yell/bin')
      .stdout('OHAI!')
      .code(0)
      .run('node index.js loud ohai', done);
  });
  it('executes the file in its own environment', function(done) {
    nixt()
      .cwd('examples/yell')
      .path('examples/yell/bin')
      .stdout('####!')
      .code(0)
      .run('node index.js curse ohai', done);
  });
  it('provides environment variables');
  it('suggests similar commands');
});
