
/**
 * Tab completion for hoagie applications. This works via three flags:
 *
 * - <program> --commands
 *   Prints out all available commands for command completion.
 * - <program> --completion
 *   Prints out a completion handler script for the current SHELL.
 *   If we're connected to a TTY, print a short help message instead.
 * - <program> command --complete
 *   Your commands should handle the --complete flag and respond
 *   with the completion options. These will be fed to compgen
 *   so just give all of the available options.
 *
 * You need to install the completion handler script in your profile
 * or similar. Run `<program> --completion` for the instructions.
 */

module.exports = function completion() {
  return function(req, res, next) {

    // if there is a command, skip this middleware.
    // commands must handle their own completion.
    if (req.command) {
      return next();
    }

    // print all registered commands
    if (req.params.commands) {
      return commands(req, res, next);
    }

    // print the completion script or install instructions
    if (req.params.completion) {
      if (res.isTTY) {
        return install(req, res, next);
      } else {
        return script(req, res, next);
      }
    }

    next();
  };
};

/**
 * Prints all registered commands.
 */

function commands(req, res /*, next */) {
  req.app.commands.forEach(function(command) {
    res.writeln(command);
  });
  res.end();
}

/**
 * Prints install instructions for the completion script.
 */

function install(req, res /*, next */) {
  res.writeln('Add the following to your profile:');
  res.writeln('eval "$(%s --completion)"', req.program);
  res.end();
}

/**
 * Prints the completion init script for the user's shell.
 */

function script(req, res, next) {
  switch (req.get('SHELL')) {
  case '/bin/sh':
  case '/bin/bash':
    res.render(__dirname + '/init.bash');
    break;
  default:
    next(new Error('Unsupported shell: ' + req.get('SHELL')));
  }
}
