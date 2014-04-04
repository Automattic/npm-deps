var fs = require('fs');
var path = require('path');

module.exports = function(app) {
  return function output(deps) {
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
    
    if (app.output) {
      fs.writeFileSync(app.output, JSON.stringify(pkgJson, null, 2), 'utf-8');
    } else {
      console.log(JSON.stringify(pkgJson, null, 2));
    }
  }
}