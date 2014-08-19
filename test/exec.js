var subject = require('../lib/exec');
var assert = require('assert');

/* global describe, it, beforeEach */

describe('exec', function() {
  var req;

  beforeEach(function() {
    req = {};
    req.package = {};
    req.prefix = '';
  });
  it('spawns a child process for the given command', function(done) {
    req.command = 'echo';
    req.args = ['OK'];

    subject(req, function(err, cp) {
      assert.ifError(err);
      assert.data(cp.stdout, 'OK\n', done);
    });
  });
  it('passes if the command does not exist', function(done) {
    req.command = 'bad_command';

    subject(req, function(err, cp) {
      assert.ifError(err);
      assert.equal(cp, null);
      done();
    });
  });
  it('exports HOAGIE_NAME', function(done) {
    req.package.name = 'foo';
    req.command = 'printenv';
    req.args = ['HOAGIE_NAME'];

    subject(req, function(err, cp) {
      assert.ifError(err);
      assert.data(cp.stdout, 'foo\n', done);
    });
  });
  it('exports $HOAGIE_VERSION', function(done) {
    req.package.version = '1.2.3';
    req.command = 'printenv';
    req.args = ['HOAGIE_VERSION'];

    subject(req, function(err, cp) {
      assert.ifError(err);
      assert.data(cp.stdout, '1.2.3\n', done);
    });
  });
  it('exports $HOAGIE_COMMAND', function(done) {
    req.command = 'printenv';
    req.args = ['HOAGIE_COMMAND'];

    subject(req, function(err, cp) {
      assert.ifError(err);
      assert.data(cp.stdout, 'printenv\n', done);
    });
  });
});
