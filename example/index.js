#!/usr/bin/env node

/**
 * NB this is only for this example program and the test suite.
 * You SHOULD NOT do this in your own application.
 */
process.env.PATH = __dirname + ':' + process.env.PATH;

/**
 * To create an application, simply require('hoagie') and pass
 * it your package.json.
 */
require('..')(require('./package.json'));
