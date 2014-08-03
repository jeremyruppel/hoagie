var nixt = require('nixt');
var fixture = require('./fixtures');

describe('subcommands', function() {
  it('executes a subcommand', function(done) {
    this.example
      .stdout('OHAI!')
      .code(0)
      .run('node index.js loud ohai', done);
  });
  it('executes the file in its own environment', function(done) {
    this.example
      .stdout('####!')
      .code(0)
      .run('node index.js curse ohai', done);
  });
  it('provides environment variables');
  it('suggests similar commands', function(done) {
    this.example
      .stderr(fixture('yell/suggest.txt'))
      .code(1)
      .run('node index.js course')
      .end(done);
  });
});
