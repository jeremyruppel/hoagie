var nixt = require('nixt');
var fixture = require('./fixtures');

describe('env', function() {
  it('exports $HOAGIE_NAME', function(done) {
    this.example
      .stdout('yell')
      .code(0)
      .run('node index.js env HOAGIE_NAME', done);
  });
  it('exports $HOAGIE_VERSION', function(done) {
    this.example
      .stdout('1.2.3')
      .code(0)
      .run('node index.js env HOAGIE_VERSION', done);
  });
  it('exports $HOAGIE_COMMAND', function(done) {
    this.example
      .stdout('env')
      .code(0)
      .run('node index.js env HOAGIE_COMMAND', done);
  });
});
