/**
 * Module Dependencies
 */

var ansi = require('ansi')
  , out = ansi(process.stdout)
  , error = ansi(process.stderr);

/**
 * Write a log message
 */

exports.log = function (m, M) {
  error.bg.black().grey().write('npm-deps').reset().write(' ').green().write('info ').reset();
  if (arguments.length == 2) {
    out.magenta().write(m + ' ').reset().write(M);
  } else {
    out.write(m);
  }
  out.write('\n');
}

/**
 * Write a warning message
 */

exports.warn = function (m, M) {
  error.bg.black().grey().write('npm-deps').reset().write(' ').black().bg.yellow().write('WARN').reset().bg.reset().write(' ');
  if (arguments.length == 2) {
    error.magenta().write(m + ' ').reset().write(M);
  } else {
    error.write(m);
  }
  error.write('\n');
}


/**
 * Write an error message
 */

exports.error = function (m, M) {
  error.bg.black().grey().write('npm-deps').reset().write(' ').red().write('ERR! ').reset();
  if (arguments.length == 2) {
    error.magenta().write(m + ' ').reset().write(M);
  } else {
    error.write(m);
  }
  error.write('\n');
}