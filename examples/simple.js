#!/usr/bin/env node

/**
 * This app has one subcommand, `reverse`, which reverses the given string.
 * This also demonstrates one way to use an error handler to display
 * usage information if an unsupported subcommand is given or the required
 * argument is not provided.
 *
 * $ ./simple.js
 * Usage: reverse <word>
 * $ ./simple.js reverse
 * Usage: reverse <word>
 * $ ./simple.js reverse hello
 * olleh
 * $ ./simple.js what
 * Usage: reverse <word>
 */

var hoagie = require('..');

// create a new application
var app = hoagie();

// create an error to describe the app's usage
var usage = new Error('Usage: reverse <word>');

// create a subcommand and make sure we get an argument
app.use('reverse', function(req, res, next) {
  if (!req.params[1]) {
    return next(usage);
  }
  res.send(reverse(req.params[1]));
});

// if we didn't get the reverse subcommand, print the usage
app.use(function(req, res, next) {
  next(usage);
});

// if we get an error, output the message
app.use(function(err, req, res) {
  res.code(1).send(err.message);
});

// reverse utility function
function reverse(str) {
  return str.split('').reverse().join('');
}

// run the app
app.run(hoagie.argv);
