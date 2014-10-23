var fs = require('graceful-fs');
var path = require('path');
var concat = require('concat-stream');

function getBasePackage(filename, callback) {
  var stream;
  if (!process.stdin.isTTY) {
    stream = process.stdin;
  } else if (filename) {
    stream = fs.createReadStream(filename);
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

      var output;
      if (app.output) {
        output = fs.createWriteStream(app.output);
      } else {
        output = process.stdout;
      }

      output.end(JSON.stringify(pkgJson, null, 2) + '\n');
    });
  };
};
