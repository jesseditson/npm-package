module.exports = parsePackage

function parsePackage(callback) {
  return function(err, res) {
    switch (res.status) {
      case 404:
        return callback(new Error('Unable to find package.'))
    }
    if (err) return callback(err)
    var pkg = res.body
    try {
      pkg = JSON.parse(res.text)
    } catch(e) {
      // falling back to res.body
    }
    callback(null, pkg)
  }
}
