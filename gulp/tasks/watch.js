const gulp = require('gulp')
const browserSync = require('browser-sync')

// generate pug template watch tasks
function tmpTasks (tmp) {
  gulp.watch([
    `${src}**/${tmp}_*.pug`,
    `!${src}**/tmp_*.pug`
  ], [`pug_${tmp}:watch`])
  gulp.watch(`${src}**/tmp_${tmp}.pug`, [`pug_${tmp}_all:watch`])
}

// generate pug template watch reload tasks
function tmpTasksReload (tmp) {
  gulp.task(
    `pug_${tmp}:watch`,
    [`pug_${tmp}`],
    () => browserSync.reload()
  )
  gulp.task(
    `pug_${tmp}_all:watch`,
    [`pug_${tmp}_all`],
    () => browserSync.reload()
  )
}

// watch tasks
gulp.task(
  'watch',
  ['browserSync'],
  () => {
    if (!global.isWatching) return

    gulp.watch([
      `${src}**/*.sass`,
      `${src}**/*.scss`
    ], ['sass'])
    gulp.watch(`${src}**/*.css`, ['css'])
    gulp.watch(`${src}**/_*.pug`, ['pug:watch'])
    gulp.watch([
      `${src}${jsDir}**/*.js`,
      `${src}${jsDir}**/*.jsx`
    ], ['standard'])
    gulp.watch([
      `${src}**/*`,
      `!${src}**/*.sass`,
      `!${src}**/*.scss`,
      `!${src}**/*.pug`,
      `!${src}**/*.js`,
      `!${src}**/*.jsx`
    ], ['copy:watch'])
    pugTmps.map(tmpTasks) // generate pug watch tasks
    pugTmps.map(tmpTasksReload) // generate pug watch reload tasks
    gulp.watch(extCleanFilesWatch, ['extClean'])
  }
)

// generate reload tasks
const tasks = [
  // 在這新增偵聽事件
  'pug',
  'copy'
]

function tasksWatch (task) {
  gulp.task(
    `${task}:watch`,
    [task],
    () => { browserSync.reload() }
  )
}

tasks.map(tasksWatch)
