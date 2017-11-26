const gulp = require('gulp')
const standard = require('gulp-standard')
const changed = require('gulp-changed')

gulp.task(
  'standard',
  () => (
    gulp.src([
      `${src}${jsDir}**/*.js`,
      `${src}${jsDir}**/*.jsx`
    ])
      .pipe(standard())
      .pipe(standard.reporter('default', {
        breakOnError: false,
        quiet: true
      }))
  )
)
