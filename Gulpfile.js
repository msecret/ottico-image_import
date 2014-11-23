/*
 *
 */

var NAME = 'ottico-image-import'
var BUILD_DIR = './build/js/';

var clean = require('gulp-clean');
var es = require('event-stream');
var exec = require('child_process').exec;
var gulp = require('gulp');
var rename = require("gulp-rename");
var runSequence = require('run-sequence');
var uglify = require('gulp-uglifyjs');
var typescript = require('gulp-tsc');

gulp.task('build', function(callback) {
  runSequence('build-clean',
              'build-tsc',
              'build-compress',
              callback);
});

gulp.task('build-clean', function() {
  return gulp.src(BUILD_DIR).pipe(clean());
});

gulp.task('build-tsc', function(callback) {
  var tsOpts = {
    module: 'commonjs',
    out: NAME + '.js'
  };
  /*

  return gulp.src(['main.ts'])
    .pipe(typescript(tsOpts))
    .pipe(gulp.dest(BUILD_DIR));
    */
  exec('tsc --module '+ tsOpts.module +
       ' --out '+ BUILD_DIR + NAME + '.js' +
       ' --sourceMap' +
       ' main.ts',
    function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      callback(err);
   });
});

gulp.task('build-compress', function() {
  var ugOpts = {
    filename: NAME + '.min.js',
    outSourceMap: true
  };
  return gulp.src(BUILD_DIR + NAME + '.js')
    .pipe(uglify(ugOpts.filename, ugOpts))
    .pipe(gulp.dest(BUILD_DIR))
});

gulp.task('default', ['build']);
