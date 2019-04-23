var rc = require("rc");
var registryUrl = require("registry-url");
var request = require("superagent");
var url = require("url");
var parsePackage = require("./parse-package");

function registryPackage(name, opts, callback) {
  var npmConf = rc("npm", {});
  var npmAuthenticationToken = npmConf["//registry.npmjs.org/:_authToken"];
  var packageInfoRequest = request.get(url.resolve(registryUrl(), name));
  if (npmAuthenticationToken) {
    packageInfoRequest.set("Authorization", `Bearer ${npmAuthenticationToken}`);
  }
  packageInfoRequest.end(parsePackage(opts, callback));
}

module.exports = registryPackage;
