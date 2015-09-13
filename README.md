# hoagie

[express][express]-like organization for command-line applications.

> [![NPM version][npm-badge]][npm]
> [![Build Status][travis-badge]][travis-ci]

## Install

``` bash
$ npm install hoagie --save
```

## Usage

``` js
// math.js

var hoagie = require('hoagie');

var app = hoagie();

app.use('add', function(req, res, next) {
	var a = parseInt(req.params[1], 10);
	var b = parseInt(req.params[2], 10);

	res.send(a + b);
});

app.run(process.argv.slice(2));

```

``` bash
$ node ./math.js add 1 1
2
```

See the `examples` directory for more code samples.

## Middleware

- [hoagie-session][hoagie-session] adds "session" support

## License

[ISC License][LICENSE]

[express]: https://github.com/strongloop/express
[npm]: http://badge.fury.io/js/hoagie
[npm-badge]: https://badge.fury.io/js/hoagie.svg
[travis-ci]: https://travis-ci.org/jeremyruppel/hoagie
[travis-badge]: https://travis-ci.org/jeremyruppel/hoagie.svg?branch=master
[LICENSE]: https://github.com/jeremyruppel/hoagie/blob/master/LICENSE
[hoagie-session]: https://github.com/jeremyruppel/hoagie-session
