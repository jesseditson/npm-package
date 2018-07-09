module.exports = parsePackage

function parsePackage(opts, callback) {
  return function(err, res) {
    // Moved error checking before checking for status. 
    if (err) return callback(err)
    switch (res.status) {
      case 404:
        return callback(new Error('Unable to find package.'))
    }
    var pkg = res.body
    try {
      pkg = JSON.parse(res.text)
    } catch(e) {
      // falling back to res.body
    }
    if (typeof pkg !== 'object') return callback(new Error('Invalid response.'))
    if (!opts.includeReadme) delete pkg.readme
    callback(null, pkg)
  }
}
