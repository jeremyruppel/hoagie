# hoagie

> [![NPM version][npm-badge]][npm]
> [![Build Status][travis-badge]][travis-ci]

**hoagie** provides a nice way to organize your command-line applications into subcommands. Hoagie leverages node and npm to greatly simplify the creation of git-style subcommand apps, like 37signals' [sub][1]. It is language-agnostic and does not parse arguments for you, so you can write your subcommands in whatever language you want.

**Features:**

- [x] language agnostic
- [x] argv parser agnostic
- [x] find commands in `PATH`
- [x] list subcommands
- [x] help command
- [x] version command
- [x] colors!
- [x] suggest commands like git
- [ ] man pages support?
- [ ] rc file support?
- [ ] subcommand completion?

## Install

`$ npm install hoagie --save`

## Usage

Inside your `index.js` (or whatever your `$npm_package_main` is), simply require hoagie and give it your *parsed* package.json.

``` js
// index.js
require('hoagie')(require('./package'));
```

Your application's package.json is expected to have the following properties:

- `name` - your application's name.
- `description` - a short description of your application.
- `subcommands` - short descriptions of known subcommands.

### version

**hoagie** supports the `--version` flag out of the box and will print your program's version according to the `version` key in your package.json.

### help

**hoagie** automatically prints help information when you invoke your program with any of the following:

- no subcommand or arguments
- the `--help` flag and no subcommand
- the `help` subcommand and no arguments after that

> See "Subcommand descriptions" for instructions on how to set help text for your subcommands.

## Creating subcommands

**hoagie** searches your `PATH` for available subcommands. Subcommand files must be executable and must be prefixed with your application's name. For example, if your application is named `calc`, an executable file named `calc-foo` in your `PATH` will be invoked when you run `calc foo`.

> An easy way to get executable files into your `PATH` is to leverage npm's `bin` property.

**hoagie** does not put any restriction on what language you write your subcommands in. Use bash, ruby, python, perl, anything that your system supports. This also means that **hoagie** does not provide an option parser for your subcommand. **hoagie** will pass on any leftover flags and arguments to your subcommand and you can parse them however you wish.

### Subcommand descriptions

**hoagie** will look in your application's package.json for a `subcommands` hash. The keys of this hash should be known subcommand names and the values should be the help text for each subcommand you would like to be displayed.

### Subcommand help

Subcommands are expected to handle the `--help` flag. When a user runs `calc help foo`, **hoagie** will invoke `calc foo --help` so that your program can display whatever help text you'd like.

## License

[ISC License][LICENSE]

[1]: https://github.com/basecamp/sub
[npm]: http://badge.fury.io/js/hoagie
[npm-badge]: https://badge.fury.io/js/hoagie.svg
[travis-ci]: https://travis-ci.org/jeremyruppel/hoagie
[travis-badge]: https://travis-ci.org/jeremyruppel/hoagie.svg?branch=master
[LICENSE]: https://github.com/jeremyruppel/hoagie/blob/master/LICENSE
