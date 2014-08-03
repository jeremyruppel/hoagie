var nixt = require('nixt');

describe('version', function() {
  it('prints the version from package.json', function(done) {
    this.example
      .stdout('1.2.3')
      .code(0)
      .run('node index.js --version', done);
  });
});
