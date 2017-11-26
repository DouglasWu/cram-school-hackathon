const gulp = require('gulp')
const del = require('del')

gulp.task(
  'build',
  ['clean'],
  () => gulp.start(['runBuild'])
)

gulp.task(
  'runBuild',
  ['pugInit', 'sassInit', 'copy'],
  () => gulp.start(['extCleanInit'], 'browserify')
)

gulp.task(
  'clean',
  () => del(['./build/', './publish/'])
)
