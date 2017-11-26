const gulp = require('gulp')
const browserSync = require('browser-sync')
const connectRoute = require('connect-route')
const mockApi = require('../mockapi.js')

gulp.task(
  'browserSync',
  () => {
    if (!global.isWatching) return

    browserSync.init({
      server: {
        baseDir: [dest],
        middleware: connectRoute(mockApi)
      },
      port: global.serverPort,
      files: []
    })
  }
)
