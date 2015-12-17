var request = require('superagent')
var exec = require('child_process').exec
var parsePackage = require('./parse-package')

module.exports = hostedPackage

// uses token from https://help.github.com/articles/creating-an-access-token-for-command-line-use/
function getPrivateRepo(gitUrl, token, callback) {
  var apiUrl = gitUrl.replace(/^(git:\/\/[^\/]+\/)([^\.]+)\.git/, 'https://api.github.com/repos/$2/contents/package.json')
  request
    .get(apiUrl)
    .set('Authorization', `token ${token}`)
    .end(callback)
}

function hostedPackage(info, opts, callback) {
  var url = info.directUrl
  request
    .get(url)
    .end(function(err, res) {
      if (err && err.status === 404 && opts.token && /github\.com/i.test(info.gitUrl)) {
        // unable to find the repo. This could be a private repo. If we have an access token, we can use it to fetch a private repo.
        getPrivateRepo(info.gitUrl, opts.token, function(err, res) {
          var downloadUrl = res && res.body && res.body.download_url
          if (!downloadUrl) return parsePackage(callback)(err, res)
          request.get(downloadUrl).end(parsePackage(callback))
        })
      } else {
        parsePackage(callback)
      }
    })
}
