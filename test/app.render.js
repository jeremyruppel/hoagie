var hoagie = require('..');
var assert = require('assert');

/* jshint mocha:true */

describe('app.render', function() {
  it('renders the given view', function() {
    var app = hoagie().set('program', 'hoagie');

    assert.equal(app.render(__dirname + '/fixtures/test.txt', {}),
      'Hello from hoagie!\n');
  });
  it('throws an error if the view cannot be loaded', function() {
    var app = hoagie().set('program', 'hoagie');

    assert.throws(function() {
      app.render(__dirname + '/fixtures/missing.txt', {});
    }, /ENOENT, no such file or directory/);
  });
  it('throws an error if there is a problem rendering the view', function() {
    var app = hoagie().set('program', 'hoagie');

    assert.throws(function() {
      app.render(__dirname + '/fixtures/error.txt', {});
    }, /Cannot read property 'bar' of undefined/);
  });
});
