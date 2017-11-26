/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any files in that directory get
  automatically required below.

  To add a new task, simply add a new task file that directory.
  gulp/tasks/default.js specifies the default set of tasks to run
  when you run `gulp`.
*/

var requireDir = require('require-dir')
var env = process.env.NODE_ENV.trim()
var config = require('./gulpconfig')

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks/', { recurse: true })

// global option
global.serverPort = config.serverPort
global.cssExtname = config.cssExtname

// global path
global.src = config.dir.src
global.cssDir = config.dir.cssDir
global.jsDir = config.dir.jsDir

// global array data
global.pugTmps = config.pugTmps
global.entries = config.entries
global.extCleanFiles = config.extCleanFiles

// extClean task arrays
global.extCleanFilesRun = []
global.extCleanFilesWatch = []

if (env === 'dev') {
  global.dest = config.dir.dest['dev']
  global.staticDir = global.dest
  global.debugMode = true
  global.isWatching = true
} else if (env === 'build') {
  global.dest = config.dir.dest['dev']
  global.staticDir = global.dest
  global.debugMode = false
  global.isWatching = true
} else if (env === 'publish') {
  global.dest = config.dir.dest['publish']
  global.staticDir = global.dest
  global.debugMode = false
  global.isWatching = false
}
