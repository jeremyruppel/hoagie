var nixt = require('nixt');

describe('version', function() {
  it('prints the version from package.json', function(done) {
    nixt()
      .cwd('examples/yell')
      .path('examples/yell/bin')
      .stdout('1.2.3')
      .code(0)
      .run('node index.js --version', done);
  });
});
