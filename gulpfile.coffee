gulp = require 'gulp'
plumber = require 'gulp-plumber'
sass = require 'gulp-sass'
pug = require 'gulp-pug'
coffee = require 'gulp-coffee'

gulp.task 'sass', ->
  gulp.src './src/sass/*.scss'
    .pipe plumber()
    .pipe sass()
    .pipe gulp.dest './bin/css'

gulp.task 'coffee', ->
  gulp.src './src/coffee/*.coffee'
    .pipe plumber()
    .pipe coffee()
    .pipe gulp.dest './bin/js'

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
