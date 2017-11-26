const gulp = require('gulp')

gulp.task(
  'default',
  ['build'],
  () => gulp.start('watch')
)
