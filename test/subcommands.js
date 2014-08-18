var nixt = require('nixt');
var fixture = require('./fixtures');

describe('subcommands', function() {
  it('executes a subcommand', function(done) {
    this.example
      .stdout('OHAI!')
      .code(0)
      .run('node index.js subcommand ohai', done);
  });
  it('executes the file in its own environment', function(done) {
    this.example
      .stdout('####!')
      .code(0)
      .run('node index.js bash ohai', done);
  });
  it('suggests similar commands', function(done) {
    this.example
      .stderr(fixture('suggest.txt'))
      .code(1)
      .run('node index.js bah')
      .end(done);
  });
});
