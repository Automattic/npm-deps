var fs = require('graceful-fs');
var path = require('path');
var concat = require('concat-stream');

function getBasePackage(filename, callback) {
  var stream;
  if (filename) {
    stream = fs.createReadStream(filename);
  } else if (!process.stdin.isTTY) {
    stream = process.stdin;
  }

  if (stream) {
    var write = concat(function(data) {
      var pkgJson;
      try {
        pkgJson = JSON.parse(data);
      } catch (e) {
        pkgJson = {};
      }
      callback(null, pkgJson);
    });
    stream.pipe(write);
  } else {
    callback(null, {});
  }
}

module.exports = function(app) {
  return function output(deps) {
    getBasePackage(app.output, function(err, pkgJson) {
      if (err) throw err;
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

      var json = JSON.stringify(pkgJson, null, 2) + '\n';

      if (app.output) {
        fs.writeFileSync(app.output, json);
      } else {
        process.stdout.write(json);
      }
    });
  };
};
