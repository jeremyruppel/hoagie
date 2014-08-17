var child = require('./child');
var template = require('./template');
var fs = require('fs');

/**
 * Simply prints the program version and exits.
 */
module.exports = function(req, done) {
  if (req.opts.version) {
    var cp = child();

    fs.createReadStream(__dirname + '/views/version.ejs')
      .pipe(template(req))
      .pipe(cp.stdout)
      .on('finish', function() {
        cp.emit('exit', 0);
      });

    done(null, cp);
  } else {
    done();
  }
};
