const gulp = require('gulp')
const gulpif = require('gulp-if')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const handleErrors = require('../util/handleErrors')
const changed = require('gulp-changed')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const browserSync = require('browser-sync')

gulp.task(
  'sass',
  () => (
    gulp.src([
      `${src}**/*.sass`,
      `${src}**/*.scss`
    ])
      .pipe(gulpif(global.debugMode, sourcemaps.init()))
      .pipe(sass().on('error', sass.logError))
      // .pipe(changed(src))
      .pipe(cleanCSS({debug: true}))
      .pipe(gulpif(global.debugMode, sourcemaps.write()))
      .pipe(gulpif(
        global.cssExtname,
        rename({extname: `.${global.cssExtname}.css`})
      ))
      .pipe(gulp.dest(dest))
      .pipe(gulpif(global.isWatching, browserSync.stream()))
  )
)

gulp.task(
  'css',
  () => (
    gulp.src([
      `${src}**/*.css`
    ])
      .pipe(gulpif(global.debugMode, sourcemaps.init()))
      .on('error', handleErrors)
      // .pipe(changed(src))
      .pipe(cleanCSS({debug: true}))
      .pipe(gulpif(global.debugMode, sourcemaps.write()))
      .pipe(gulpif(
        global.cssExtname,
        rename({extname: `.${global.cssExtname}.css`})
      ))
      .pipe(gulp.dest(dest))
      .pipe(gulpif(global.isWatching, browserSync.stream()))
  )
)

gulp.task(
  'sassInit',
  ['sass', 'css']
)
