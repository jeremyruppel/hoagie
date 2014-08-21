# hoagie

> [![NPM version][npm-badge]][npm]
> [![Build Status][travis-badge]][travis-ci]

**hoagie** provides a nice way to organize your command-line applications into subcommands. Hoagie leverages node and npm to greatly simplify the creation of git-style subcommand apps, like 37signals' [sub][1]. It is language-agnostic and does not parse arguments for you, so you can write your subcommands in whatever language you want.

**Features:**

- [x] language agnostic
- [x] argv parser agnostic
- [x] find commands in `PATH`
- [x] list commands
- [x] help command
- [x] version command
- [ ] rc file support?
- [ ] man pages support?
- [x] colors!
- [x] suggest commands like git

## Install

`$ npm install hoagie --save`

## Usage

Inside your `index.js` (or whatever your `$npm_package_main` is), simply require hoagie and give it your package.json.

``` js
require('hoagie')(require('./package'));
```

Your application's package.json is expected to have the following properties:

- `name` - your application's name.
- `description` - a short description of your application.
- `subcommands` - short descriptions of known subcommands.

## License

[ISC License][LICENSE]

[1]: https://github.com/basecamp/sub
[npm]: http://badge.fury.io/js/hoagie
[npm-badge]: https://badge.fury.io/js/hoagie.svg
[travis-ci]: https://travis-ci.org/jeremyruppel/hoagie
[travis-badge]: https://travis-ci.org/jeremyruppel/hoagie.svg?branch=master
[LICENSE]: https://github.com/jeremyruppel/hoagie/blob/master/LICENSE
