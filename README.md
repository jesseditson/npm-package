# npm-package
fetches the package information for an npm package


# Usage

`npm install --save npm-package-info`

or

`npm install -g npm-package-info`

**node module**

```javascript
var npmPackage = require('npm-package-info')

// get a public package
npmPackage('package-name', function(err, pkg) {
  // pkg is an object containing the contents of package.json
})

// get a private github package
npmPackage('user/repo', { token: 'githubtoken' }, function(err, pkg) {
  // same as above
})
```

**command line**

```
# public
$ npm-package package-name
# private
$ npm-package --token githubtoken package-name
# both above commands output pretty printed json to stdout
```

**generating a github token**

The tokens used above are for accessing private github content via the API. You can find out how to generate a github token here:

[https://help.github.com/articles/creating-an-access-token-for-command-line-use/](https://help.github.com/articles/creating-an-access-token-for-command-line-use/)

**FAQ**

- Does this work with private npm hosts?

I dunno, but probably. I don't currently use private npm packages or self hosted npm, so testing and reporting issues in this area would be appreciated!

- Does this work with <special type of npm package definition>?

Probably! This uses the same resolver as npm core, so in theory it should be able to resolve anything npm can resolve, including version numbers and tags. That being said, if you find something that doesn't work, please file an issue so I can fix it.
