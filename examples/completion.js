#!/usr/bin/env node

/**
 * A simple translation app to demonstrate tab completion.
 * You will need to install this in your PATH for the `complete`
 * program to work correctly. Assuming ~/bin is in your PATH:
 *
 * $ ln -s $PWD/examples/completion.js ~/bin/translate
 *
 * Now, let's try a few things. The --commands flag makes the
 * program print out any commands it knows about. This is used
 * under the hood to complete top-level commands:
 *
 * $ translate --commands
 * spanish
 * emoji
 *
 * To make completion work, you'll have to install a small
 * completion handler for your shell. Send --completion to
 * a TTY to get some brief instructions:
 *
 * $ translate --completion
 * Add the following to your profile:
 * eval "$(translate --completion)"
 *
 * Add `eval "$(translate --completion)"` to your profile
 * and source it to install for good, or if you just want
 * it for this demo:
 *
 * $ eval "$(translate --completion)"
 *
 * Now the following should work:
 *
 * $ translate [TAB][TAB]
 * spanish    emoji
 * $ translate e[TAB]
 * $ translate emoji [TAB][TAB]
 * beer       beetle     whalefart
 * $ translate emoji b[TAB]
 * $ translate emoji bee[TAB]
 * beer    beetle
 * $ translate emoji beer
 * 🍺
 */

var hoagie = require('..');

var app = hoagie();

app.use(hoagie.completion());

app.use('spanish', translate({
  'beer':      'cerveza',
  'beetle':    'escarabajo',
  'whalefart': 'pedo ballena'
}));

app.use('emoji', translate({
  'beer':      '🍺',
  'beetle':    '🐞',
  'whalefart': '🐋💨'
}));

/**
 * Returns a simple middleware that will look up a key
 * in `words` and print the value. This middleware also
 * supports completion by looking for the `--complete`
 * flag and prints the available keys. We'll use this
 * to translate a few terms in both spanish and emoji.
 */

function translate(words) {
  return function(req, res) {
    if (req.params.complete) {
      return res.send(Object.keys(words).join(' '));
    }
    res.send(words[req.params[1]]);
  };
}

app.run(hoagie.argv);
