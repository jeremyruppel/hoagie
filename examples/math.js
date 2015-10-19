#!/usr/bin/env node

/**
 * A simple math app.
 *
 * $ ./math.js add 1 1
 * 2
 */

var hoagie = require('..');

var app = hoagie();

app.use('add', function(req, res) {
	var a = parseInt(req.params[1], 10);
	var b = parseInt(req.params[2], 10);

	res.send(a + b);
});

app.run(hoagie.argv);
