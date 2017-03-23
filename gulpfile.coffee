gulp = require 'gulp'
plumber = require 'gulp-plumber'
sass = require 'gulp-sass'
pug = require 'gulp-pug'
coffee = require 'gulp-coffee'
source = require 'vinyl-source-stream'
browserify = require 'browserify'
buffer = require 'vinyl-buffer'
uglify = require 'gulp-uglify'

gulp.task 'sass', ->
  gulp.src './src/sass/*.scss'
    .pipe plumber()
    .pipe sass()
    .pipe gulp.dest './bin/css'

gulp.task 'coffee', ->
  browserify
      entries: ['./src/coffee/index.coffee']
      extensions: ['.coffee', '.js']
      debug: true
    .transform 'coffeeify'
    .bundle()
    .pipe source 'main.js'
    .pipe buffer()
    .pipe uglify()
    .pipe gulp.dest 'bin/js'

gulp.task 'pug', ->
  gulp.src './src/pug/*.pug'
    .pipe plumber()
  .pipe pug
    pretty: true
  .pipe gulp.dest './'

gulp.task 'watch', ->
  gulp.watch './src/sass/*.scss', ['sass']
  gulp.watch './src/coffee/*.coffee', ['coffee']
  gulp.watch './src/pug/*.pug', ['pug']

gulp.task 'default', ['sass', 'coffee', 'pug', 'watch']
