var subject = require('../lib/first');
var assert = require('assert');
var sinon = require('sinon');

describe('first', function() {
  it('yields the first truthy result', function(done) {
    var obj = 'obj';
    var fns = [
      sinon.stub().yieldsAsync(),
      sinon.stub().yieldsAsync(null, 'val'),
      sinon.stub().yieldsAsync()
    ];
    subject(fns, obj, function(err, val) {
      assert.equal(val, 'val');
      sinon.assert.calledOnce(fns[0]);
      sinon.assert.calledWith(fns[0], obj, sinon.match.func);
      sinon.assert.calledOnce(fns[1]);
      sinon.assert.calledWith(fns[1], obj, sinon.match.func);
      sinon.assert.notCalled(fns[2], 0)
      done(err);
    });
  });
  it('yields an error if one is yielded', function(done) {
    var obj = 'obj';
    var fns = [
      sinon.stub().yieldsAsync(),
      sinon.stub().yieldsAsync('err'),
      sinon.stub().yieldsAsync()
    ];
    subject(fns, obj, function(err, val) {
      assert.equal(err, 'err');
      sinon.assert.calledOnce(fns[0]);
      sinon.assert.calledWith(fns[0], obj, sinon.match.func);
      sinon.assert.calledOnce(fns[1]);
      sinon.assert.calledWith(fns[1], obj, sinon.match.func);
      sinon.assert.notCalled(fns[2], 0)
      done();
    });
  });
  it('yields an error if there are no truthy results', function(done) {
    var obj = 'obj';
    var fns = [
      sinon.stub().yieldsAsync(),
      sinon.stub().yieldsAsync(),
      sinon.stub().yieldsAsync()
    ];
    subject(fns, obj, function(err, val) {
      assert.equal(err.message, 'No functions yielded');
      sinon.assert.calledOnce(fns[0]);
      sinon.assert.calledWith(fns[0], obj, sinon.match.func);
      sinon.assert.calledOnce(fns[1]);
      sinon.assert.calledWith(fns[1], obj, sinon.match.func);
      sinon.assert.calledOnce(fns[2]);
      sinon.assert.calledWith(fns[2], obj, sinon.match.func);
      done();
    });
  });
  it('calls the callbacks in series', function(done) {
    var obj = 'obj';
    var fns = [
      sinon.stub().yieldsAsync(),
      sinon.stub().yieldsAsync(),
      sinon.stub().yieldsAsync()
    ];
    subject(fns, obj, function(err, val) {
      sinon.assert.callOrder(fns[0], fns[1], fns[2]);
      done();
    });
  });
});
