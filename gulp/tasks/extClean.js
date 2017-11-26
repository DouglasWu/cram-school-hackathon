const gulp = require('gulp')
const handleErrors = require('../util/handleErrors')
const changed = require('gulp-changed')
const ext_replace = require('gulp-ext-replace')

function extCleanArrays (extCleanFile, index) {
  const file = extCleanFile.substring(
    extCleanFile.lastIndexOf('/') + 1,
    extCleanFile.lastIndexOf('.')
  )
  const watchPath = extCleanFile.substring(0, extCleanFile.lastIndexOf('/') + 1)

  // 更新參照檔案路徑
  extCleanFilesRun.push(`${dest}${extCleanFile}`)

  // 更新偵聽檔案路徑
  extCleanFilesWatch.push(`${src}${watchPath}*${file}.*`)
}

gulp.task(
  'extClean',
  () => (
    gulp.src(extCleanFilesRun)
      .on('error', handleErrors)
      .pipe(ext_replace(''))
      .pipe(changed(dest))
      .pipe(gulp.dest(dest))
  )
)

gulp.task(
  'extCleanInit',
  () => {
    extCleanFiles.forEach(extCleanArrays)
    gulp.start('extClean')
  }
)
