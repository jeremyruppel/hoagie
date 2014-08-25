var fixture = require('./fixtures');
var nixt = require('nixt');

/* global describe, it, beforeEach */

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
        .stdout(fixture('version.txt'))
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
    it('works as a subcommand', function(done) {
      example
        .stdout(fixture('help.txt'))
        .code(0)
        .run('help', done);
    });
    it('runs the subcommand help', function(done) {
      example
        .stdout(fixture('exec.txt'))
        .code(0)
        .run('exec --help', done);
    });
    it('delegates to subcommands help', function(done) {
      example
        .stdout(fixture('exec.txt'))
        .code(0)
        .run('help exec', done);
    });
  });
  describe('exec', function() {
    it('executes a subcommand', function(done) {
      var args = [
        'node',
        process.cwd() + '/example/hoagie-exec',
        'arg'
      ];
      example
        .stdout(JSON.stringify(args))
        .code(0)
        .run('exec arg', done);
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
