var nixt = require('nixt');
var fixture = require('./fixtures');

describe('env', function() {
  it('exports $MENU_NAME', function(done) {
    this.example
      .stdout('yell')
      .code(0)
      .run('node index.js env MENU_NAME', done);
  });
  it('exports $MENU_VERSION', function(done) {
    this.example
      .stdout('1.2.3')
      .code(0)
      .run('node index.js env MENU_VERSION', done);
  });
  it('exports $MENU_COMMAND', function(done) {
    this.example
      .stdout('env')
      .code(0)
      .run('node index.js env MENU_COMMAND', done);
  });
});
