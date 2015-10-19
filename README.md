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

app.run(hoagie.argv);
```

``` bash
$ node ./math.js add 1 1
2
```

See the `examples` directory for more code samples.

### app.use([command, ]fn...)

Adds each middleware function to the stack, optionally under the `command` space. Each middleware should be a function of the signature `function(req, res, next)`.

## Middleware

- [hoagie-session][hoagie-session] adds "session" support
- [hoagie-exec][hoagie-exec] Make your hoagie program exec to another process

## License

[ISC License][LICENSE]

[express]: https://github.com/strongloop/express
[npm]: http://badge.fury.io/js/hoagie
[npm-badge]: https://badge.fury.io/js/hoagie.svg
[travis-ci]: https://travis-ci.org/jeremyruppel/hoagie
[travis-badge]: https://travis-ci.org/jeremyruppel/hoagie.svg?branch=master
[LICENSE]: https://github.com/jeremyruppel/hoagie/blob/master/LICENSE
[hoagie-session]: https://github.com/jeremyruppel/hoagie-session
[hoagie-exec]: https://github.com/jeremyruppel/hoagie-exec
