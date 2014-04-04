var dive = require('dive')
  , fs = require('graceful-fs')
  , path = require('path')
  , util = require('./util');

function analyze(options, callback) {
  var cwd = process.cwd();
  var result = {};
  var done = false;
  var pending = 0;

  // Iterate through all directories
  eachDir(null, cwd);
  dive(cwd, { directories: true, files: false }, eachDir, whenDone);

  function eachDir(err, dir) {
    if (err) return;
    if (dir.match(/node_modules/)) {
      return;
    }

    // Check for existance of package.json and read it
    var pkgjson = path.join(dir, 'package.json');
    pending++;
    fs.exists(pkgjson, function(exists) {
      if (exists) {
        fs.readFile(pkgjson, 'utf-8', function(err, json) {
          if (err) throw err;
          var data = JSON.parse(json);

          // Extract dependencies
          addDependencies(data.dependencies, path.relative(cwd, dir), 'production');

          // Extract development dependencies
          addDependencies(data.devDependencies, path.relative(cwd, dir), 'development');

          --pending;
          checkReady();
        })
      } else {
        --pending;
        checkReady();
      }
    })
  }

  function addDependencies(deps, dir, type) {
    if (!deps) {
      return;
    }
    for (dep in deps) {
      var version = deps[dep];
      // Try to add dependencies to root directory
      if (!result[dep]) {
        result[dep] = { version: version, type: type };
      } else {
        // check for inconsistent dependency versions.
        if (result[dep].version != version) {
          if (!options.silent) {
            util.warn(dir, 'inconsistent dependency version ' + dep + '@' + version);
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