var fixture = require('./fixtures');
var nixt = require('nixt');

describe('example', function() {
  var example;

  beforeEach(function() {
    example = nixt({
      colors: false
    }).cwd('example').base('node index.js ');
  });
  describe('version', function() {
    it('prints the version from package.json', function(done) {
      example
        .stdout('1.2.3')
        .code(0)
        .run('--version', done);
    });
  });
  describe('help', function() {
    it('prints usage information', function(done) {
      example
        .stdout(fixture('help.txt'))
        .code(0)
        .run('--help', done);
    });
    it('is the default command', function(done) {
      example
        .stdout(fixture('help.txt'))
        .code(0)
        .run('', done);
    });
    it('runs the subcommand help', function(done) {
      example
        .stdout(fixture('subcommand.txt'))
        .code(0)
        .run('subcommand --help', done);
    });
    it('delegates to subcommands help', function(done) {
      example
        .stdout(fixture('subcommand.txt'))
        .code(0)
        .run('help subcommand', done);
    });
  });
  describe('exec', function() {
    it('executes a subcommand', function(done) {
      example
        .stdout('OHAI!')
        .code(0)
        .run('subcommand ohai', done);
    });
    it('executes the file in its own environment', function(done) {
      example
        .stdout('####!')
        .code(0)
        .run('bash ohai', done);
    });
  });
  describe('suggest', function() {
    it('suggests a command', function(done) {
      example
        .stderr(fixture('suggest.txt'))
        .code(1)
        .run('bah')
        .end(done);
    });
  });
});
