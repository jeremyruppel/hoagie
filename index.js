var args = require('nopt')({
  'version': Boolean
});

// module.paths
// module.parent.paths
module.exports = function(package) {
  // console.log(require(package));
  // console.log(args);
  // console.log(module.paths);

  var program = require(package);

  if (args.version) {
    console.log(program.version);
    process.exit(0);
  }
};
