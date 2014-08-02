var nixt = require('nixt');

describe('help', function() {
  it('works as a flag', function(done) {
    nixt()
      .cwd('examples/yell')
      .stdout('usage: yell [--version] [--help]')
      .code(0)
      .run('node index.js --help', done);
  });
  it('works as a subcommand', function(done) {
    nixt()
      .cwd('examples/yell')
      .stdout('usage: yell [--version] [--help]')
      .code(0)
      .run('node index.js help', done);
  });
  it('is the default command', function(done) {
    nixt()
      .cwd('examples/yell')
      .stdout('usage: yell [--version] [--help]')
      .code(0)
      .run('node index.js', done);
  });
  it('delegates to subcommands help implementation');
});
