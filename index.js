var opts = require('nopt')({
  'version': Boolean,
  'help': Boolean
});

// module.paths
// module.parent.paths
module.exports = function(package) {
  // console.log(require(package));
  // console.log(args);
  // console.log(module.paths);

  var program = require(package);

  function args(idx) {
    return typeof idx === 'number'
      ? opts.argv.cooked[idx]
      : opts[idx];
  }

  if (args('version')) {
    console.log(program.version);
    process.exit(0);
  }
  if (args('help') || args(0) === 'help' || !args(0)) {
    console.log('usage: %s [--version] [--help]', program.name);
    process.exit(0);
  }
};
