var hoagie = require('..');
var assert = require('assert');

/* jshint mocha:true */

describe('app.render', function() {
  it('renders the given view', function() {
    var app = hoagie().set('program', 'hoagie');

    assert.equal(app.render(__dirname + '/fixtures/test.txt'),
      'Hello from hoagie!\n');
  });
  it('throws an error if the view cannot be loaded', function() {
    assert.throws(example, /ENOENT, no such file or directory/);

    function example() {
      hoagie().render(__dirname + '/fixtures/missing.txt');
    }
  });
  it('throws an error if there is a problem rendering the view', function() {
    assert.throws(example, /foo is not defined/);

    function example() {
      hoagie().render(__dirname + '/fixtures/error.txt');
    }
  });
  it('uses provided locals', function() {
    var app = hoagie();

    assert.equal(app.render(__dirname + '/fixtures/locals.txt', {
      one: 'wow',
      two: 'amaze'
    }), 'wow amaze\n');
  });
  it('uses application locals', function() {
    var app = hoagie();

    app.locals.one = 'wow';

    assert.equal(app.render(__dirname + '/fixtures/locals.txt', {
      two: 'amaze'
    }), 'wow amaze\n');
  });
});
