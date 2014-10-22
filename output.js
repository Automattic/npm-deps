var fs = require('graceful-fs');
var path = require('path');
var concat = require('concat-stream');

function getBasePackage(callback) {
  var write = concat(function(data) {
    var pkgJson;
    try {
      pkgJson = JSON.parse(data);
    } catch (e) {
      pkgJson = {};
    }

    callback(pkgJson);
  });

  process.stdin.pipe(write);
}

module.exports = function(app) {
  return function output(deps) {
    getBasePackage(function(pkgJson) {
      if (!pkgJson.dependencies) pkgJson.dependencies = {};
      if (!pkgJson.devDependencies) pkgJson.devDependencies = {};

      for (var name in deps) {
        var dep = deps[name];
        if (dep.type == 'development') {
          pkgJson.devDependencies[name] = dep.version;
        } else {
          pkgJson.dependencies[name] = dep.version;
        }
      }

      if (app.output) {
        fs.writeFileSync(app.output, JSON.stringify(pkgJson, null, 2) + '\n', 'utf-8');
      } else {
        console.log(JSON.stringify(pkgJson, null, 2));
      }
    });
  };
};
