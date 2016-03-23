var registryUrl = require('registry-url')
var request = require('superagent')
var url = require('url')
var parsePackage = require('./parse-package')

module.exports = registryPackage

function registryPackage(name, opts, callback) {
  request
    .get(url.resolve(registryUrl(), name))
    .end(parsePackage(opts, callback))
}
