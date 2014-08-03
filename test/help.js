var nixt = require('nixt');

describe('help', function() {
  var output = 'usage: yell [command] [--version] [--help]'
             + '   curse  usage here'
             + '   loud   usage here';

  it('prints usage information', function(done) {
    nixt({
      colors: false,
      newlines: false,
    }).cwd('examples/yell')
      .path('examples/yell/bin')
      .stdout(output)
      .code(0)
      .run('node index.js --help', done);
  });
  it('is the default command', function(done) {
    nixt({
      colors: false,
      newlines: false,
    }).cwd('examples/yell')
      .path('examples/yell/bin')
      .stdout(output)
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
