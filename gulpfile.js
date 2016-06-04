var gulp = require('gulp');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');

var uglify = require('gulp-uglify');

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var jsFile = './src/angular_c3_simple.js';
var jsFileMin = 'angular_c3_simple.min.js';

gulp.task('default', function () {
  return gulp.src(jsFile)
    .pipe(uglify({
      mangle: false
    }))
    .pipe(rename(jsFileMin))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(files, ['default']);
});

gulp.task('lint:js', function() {
  return gulp.src(jsFile)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
