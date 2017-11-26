const gulp = require('gulp')
const browserify = require('browserify')
const assign = require('lodash.assign')
const watchify = require('watchify')
const bundleLogger = require('../util/bundleLogger')
const babelify = require('babelify')
const browserifyShim = require('browserify-shim')
const handleErrors = require('../util/handleErrors')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const gulpif = require('gulp-if')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const derequire = require('gulp-derequire')
const rename = require('gulp-rename')
const browserSync = require('browser-sync')

gulp.task(
  'browserify',
  ['standard'],
  () => {
    entries.map(entry => {
      // setting browserify options
      const customOpts = {
        // Required watchify args
        cache: {},
        packageCache: {},
        fullPaths: false,
        paths: [
          './node_modules',
          './src/component'
        ],
        // Specify the entry point of your app
        entries: [`${src}${jsDir}${entry}`],
        standalone: entry,
        // Add file extentions to make optional in your requires
        extensions: [
          '.js',
          '.min.js'
        ],
        // Enable source maps!
        debug: global.debugMode
      }

      const opts = assign({}, watchify.args, customOpts)
      const b =
        global.isWatching ? (
          watchify(browserify(opts))
            .external('react')
            .external('react-dom')
        ) : (
          browserify(customOpts)
            .external('react')
            .external('react-dom')
        )

      b.on('update', bundle)

      function bundle () {
        // Log when bundling starts
        bundleLogger.start()
        return b
          .transform(babelify, {presets: ['es2015', 'react']})
          .transform(browserifyShim, {global: true})
          .bundle()
          // Report compile errors
          .on('error', handleErrors)
          // 使用 vinyl-source-stream 使gulp兼容. 在此指定輸出擋名
          .pipe(source(entry)) // 輸出檔名
          // convert from streaming to buffered vinyl file object
          .pipe(buffer())
          // create sourcemap //如果global.debugMode = true產生sourcemaps
          .pipe(gulpif(global.debugMode, sourcemaps.init({loadMaps: true})))
          .pipe(gulpif(global.debugMode, sourcemaps.write('./')))
          // compress //壓縮JS與sourcemaps
          .pipe(gulpif(!global.debugMode, uglify()))
          .pipe(derequire([
            {
              from: 'require',
              to: '_dereq_'
            }
          ]))
          // Specify the output destination 輸出位置
          .pipe(gulp.dest(`${dest}${jsDir}`))
          // Log when bundling completes!
          .pipe(gulpif(global.isWatching, browserSync.stream()))
          .on('end', bundleLogger.end)
      }

      bundle()
    })
  }
)
