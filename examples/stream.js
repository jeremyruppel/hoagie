var stream = require('stream');
var hoagie = require('..');

var app = hoagie();

app.use(function(req, res) {
  req.pipe(upcase()).pipe(res);
});

function upcase() {
  var t = new stream.Transform();

  t._transform = function(chunk, encoding, callback) {
    callback(null, String(chunk).toUpperCase());
  };

  return t;
}

app.run([]);
