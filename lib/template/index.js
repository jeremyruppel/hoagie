var map = require('map-stream');
var ejs = require('ejs');

/**
 * Templates `data` into the text stream.
 */
module.exports = function(data) {
  return map(function(tmpl, done) {
    done(null, ejs.render(String(tmpl), data));
  });
};

/**
 * Custom ejs filters
 */
ejs.filters.ljust = require('./ljust');
