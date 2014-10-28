var fs = require('graceful-fs');
var dive = require('dive');
var path = require('path');
var log = require('./log');

function analyze(options, callback) {
  var cwd = process.cwd();
  var result = {};
  var done = false;
  var pending = 0;

  // Iterate through all directories
  dive(cwd, { directories: true, files: false }, eachDir, whenDone);

  function eachDir(err, dir) {
    if (err) return;

    var rel = path.relative(cwd, dir);

    // don't process any `node_modules` directories
    var nodeModules = 'node_modules';
    if (nodeModules === rel.substring(0, nodeModules.length)) {
      log.verbose('analyze', 'skipping `node_modules` directory: %s', dir);
      return;
    }

    // Check for existence of package.json and read it
    var pkgjson = path.join(dir, 'package.json');
    pending++;
    fs.readFile(pkgjson, 'utf-8', function(err, json) {
      if (err) {
        if (err.code == 'ENOENT') {
          --pending;
          return checkReady();
        }
        throw err;
      }
      var data = JSON.parse(json);

      // Extract dependencies
      addDependencies(data.dependencies, rel, 'production');

      // Extract development dependencies
      addDependencies(data.devDependencies, rel, 'development');

      --pending;
      checkReady();
    });
  }

  function addDependencies(deps, dir, type) {
    if (!deps) {
      return;
    }
    for (var dep in deps) {
      var version = deps[dep];
      // Try to add dependencies to root directory
      if (!result[dep]) {
        result[dep] = { version: version, type: type };
      } else {
        // check for inconsistent dependency versions.
        if (result[dep].version != version) {
          if (!options.silent) {
            log.warn('analyze', '%s: inconsistent dependency version %s@%s', dir, dep, version);
          }
        }
        // check if the same dep is used on dev and production, if so
        // make it sure it's listed as a production dep
        if ((type == 'production') && (result[dep].type == 'development')) {
          result[dep].type = 'production';
        }
      }
    }
  }

  // called when all directories are visited
  function whenDone() {
    done = true;
    checkReady();
  }

  // Check if all package.json files were read
  function checkReady() {
    if (done && !pending) {
      callback && callback(result);
    }
  }
}

module.exports = analyze;
