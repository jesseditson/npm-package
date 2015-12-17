var realizePackageSpecifier = require('realize-package-specifier')
var hostedPackage = require('./lib/hosted-package')
var registryPackage = require('./lib/registry-package')

module.exports = npmPackage

function npmPackage(name, opts, callback) {
  if (!callback) {
    callback = opts
    opts = {}
  }
  realizePackageSpecifier(name, function(err, result) {
    if (err) return callback(err)
    if (result.type === 'hosted') {
      return hostedPackage(result.hosted, opts, callback)
    } else {
      return registryPackage(result.name, opts, callback)
    }
  })
}
