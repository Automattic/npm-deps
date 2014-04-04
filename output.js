var fs = require('fs');
var path = require('path');

function output(deps) {
  var pkgJson;
  try {
    pkgJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  } catch (e) {
    pkgJson = {};
  }
  pkgJson.dependencies = {};
  pkgJson.devDependencies = {};
  
  for (var name in deps) {
    var dep = deps[name];
    if (dep.type == 'development') {
      pkgJson.devDependencies[name] = dep.version;
    } else {
      pkgJson.dependencies[name] = dep.version;
    }
  }
  
  console.log(JSON.stringify(pkgJson, null, 2));
}

module.exports = output;