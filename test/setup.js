var nixt = require('nixt');
var fs = require('fs');

/**
 * Appends `dir` to the world's PATH
 */
nixt.register('path', function(dir) {
  var path = require('path');
  var PATH = this.world.env.PATH;

  return this.env('PATH',
    path.join(process.cwd(), dir) + path.delimiter + PATH);
});

beforeEach(function() {
  this.example = nixt({
    colors: false
  }).cwd('examples/yell')
    .path('examples/yell/bin');
});
