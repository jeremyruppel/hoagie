var map = require('map-stream');
var ejs = require('ejs');
var chalk = require('chalk');

/**
 * Templates `data` into the text stream.
 */
module.exports = function(data) {
  return map(function(tmpl, done) {
    done(null, ejs.render(String(tmpl), data));
  });
};

/**
 * Colors
 */
Object.keys(chalk.styles).forEach(function(meth) {
  ejs.filters[meth] = chalk[meth];
});

/**
 * Custom ejs filters
 */
ejs.filters.ljust = require('./ljust');
