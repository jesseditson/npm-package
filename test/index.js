var test = require('tape')
var npmPackage = require('..')

test('gets package info for a registry package', t => {
  t.plan(5)
  npmPackage('npm-package-info', (err, pkg) => {
    t.error(err, 'should not error')
    t.equal(typeof pkg, 'object', 'should return an object')
    t.equal(pkg.name, 'npm-package-info', 'name should be correct')
    t.ok(pkg.versions, 'should have a versions key')
    t.notOk(pkg.readme, 'should omit the readme key')
  })
})

test('will return readme if includeReadme is specified', t => {
  t.plan(2)
  npmPackage('npm-package-info', { includeReadme: true }, (err, pkg) => {
    t.error(err, 'should not error')
    t.ok(pkg.readme, 'should include the readme')
  })
})
