var nixt = require('nixt');

/**
 * Appends `dir` to the world's PATH
 */
nixt.register('path', function(dir) {
  var path = require('path');
  var PATH = this.world.env.PATH;

  return this.env('PATH',
    path.join(process.cwd(), dir) + path.delimiter + PATH);
});
