
var log = require('npmlog');
var npmenv = require('npmenv')();

// differentiate npm-deps' logs from npm's
log.heading = 'npm-deps';

// inherit log level from parent npm process if running
// within an npm lifecycle script
if (npmenv.loglevel) {
  log.level = npmenv.loglevel;
}

log.resume();

module.exports = log;
