var fixture = require('./fixtures');
var nixt = require('nixt');

describe('example', function() {
  describe('version', function() {
    it('prints the version from package.json', function(done) {
      this.example
        .stdout('1.2.3')
        .code(0)
        .run('node index.js --version', done);
    });
  });
  describe('help', function() {
    it('prints usage information', function(done) {
      this.example
        .stdout(fixture('help.txt'))
        .code(0)
        .run('node index.js --help', done);
    });
    it('is the default command', function(done) {
      this.example
        .stdout(fixture('help.txt'))
        .code(0)
        .run('node index.js', done);
    });
    it('runs the subcommand help', function(done) {
      this.example
        .stdout(fixture('subcommand.txt'))
        .code(0)
        .run('node index.js subcommand --help', done);
    });
    it('delegates to subcommands help', function(done) {
      this.example
        .stdout(fixture('subcommand.txt'))
        .code(0)
        .run('node index.js help subcommand', done);
    });
  });
  describe('exec', function() {
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
  });
  describe('suggest', function() {
    it('suggests a command', function(done) {
      this.example
        .stderr(fixture('suggest.txt'))
        .code(1)
        .run('node index.js bah')
        .end(done);
    });
  });
});
