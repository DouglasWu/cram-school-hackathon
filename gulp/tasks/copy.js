const gulp = require('gulp')
const handleErrors = require('../util/handleErrors')
const changed = require('gulp-changed')

gulp.task(
  'copy',
  () => (
    gulp.src([
      `${src}**/*`,
      `!${src}**/*.sass`,
      `!${src}**/*.scss`,
      `!${src}**/*.css`,
      `!${src}**/*.pug`,
      `!${src}**/*.js`,
      `!${src}component/`,
      `!${src}component/**/*`,
      `!${src}${jsDir}**/`,
      `!${src}${cssDir}**/`
    ])
      .on('error', handleErrors)
      .pipe(changed(dest))
      .pipe(gulp.dest(dest))
  )
)
