var subject = require('../lib/which');
var assert = require('assert');

describe('which', function() {
  it('emits files in the paths that match the pattern', function(done) {
    var files = [];

    subject('which.js', [
      __dirname
    ]).on('data', function(file) {
      files.push(file);
    }).on('end', function() {
      assert.deepEqual(files, [
        __filename
      ]);
      done();
    });
  });
  it('emits files in the paths that match a glob', function(done) {
    var files = [];

    subject('s*', [
      __dirname
    ]).on('data', function(file) {
      files.push(file);
    }).on('end', function() {
      assert.deepEqual(files, [
        __dirname + '/setup.js',
        __dirname + '/subcommands.js'
      ]);
      done();
    });
  });
});
