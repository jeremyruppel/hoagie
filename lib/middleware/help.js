module.exports = function help() {
  return function(req, res, next) {
    if (req.command === 'help' && req.params[1]) {
      req.params.shift();
      req.params.help = true;
    }
    next();
  };
};
