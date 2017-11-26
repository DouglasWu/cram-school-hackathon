const gulp = require('gulp')
const pug = require('gulp-pug')
const handleErrors = require('../util/handleErrors')
const rename = require('gulp-rename')
const changed = require('gulp-changed')

// pug default task (without template)
gulp.task(
  'pug',
  () => (
    gulp.src([`${src}**/_*.pug`])
      .pipe(pug({pretty: true}))
      .on('error', handleErrors)
      .pipe(rename(path => {
        const basenameLength = path.basename.length
        const strLength = 1
        path.basename = path.basename.substr(strLength, basenameLength - strLength)
      })) // 移除前綴
      .pipe(changed(dest))
      .pipe(gulp.dest(dest))
  )
)

// create pug template tasks
function tmpRun (tmp) {
  gulp.task(
    `pug_${tmp}`,
    () => (
      gulp.src([
        `${src}**/${tmp}_*.pug`,
        `!${src}**/template/`
      ])
        .pipe(pug({pretty: true}))
        .on('error', handleErrors)
        .pipe(rename(path => {
          const basenameLength = path.basename.length
          const strLength = tmp.length + 1
          path.basename = path.basename.substr(strLength, basenameLength - strLength)
        })) // 移除前綴
        .pipe(changed(dest))
        .pipe(gulp.dest(dest))
    )
  )

  gulp.task(
    `pug_${tmp}_all`,
    () => (
      gulp.src([
        `${src}**/${tmp}_*.pug`,
        `!${src}**/template/`
      ])
        .pipe(pug({pretty: true}))
        .on('error', handleErrors)
        .pipe(rename(path => {
          const basenameLength = path.basename.length
          const strLength = tmp.length + 1
          path.basename = path.basename.substr(strLength, basenameLength - strLength)
        })) // 移除前綴
        .pipe(gulp.dest(dest))
    )
  )
}

// init pug task
let pug_all = ['pug']

function pushPugAll (tmp) {
  pug_all.push(`pug_${tmp}_all`)
}

gulp.task(
  'pugInit',
  () => {
    pugTmps.map(tmpRun)
    pugTmps.map(pushPugAll)
    gulp.start(pug_all)
  }
)
