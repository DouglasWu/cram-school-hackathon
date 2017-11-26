module.exports = function (router) {
  router.get('API/Path', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({
      'key': 'value'
    }))
  })
}
