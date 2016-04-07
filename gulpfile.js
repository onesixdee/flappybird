var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// JavaScript linting task
gulp.task('jshint', function() {
//.task method creates a new task called jshint
  return gulp.src('site/js/*.js')
  	//.src method loads all of the js files using the glob
    .pipe(jshint())
    // then pipes those files into jshint() plugin which goes through files and looks for errors
    .pipe(jshint.reporter('default'));
    // after linting, the task pipes the result to jshint.reporter which outputs to the console
});

// Compile Sass task
gulp.task('sass', function() {
//.task method creates a new task called sass
  return gulp.src('site/scss/*.scss')
  //.src method loads all of the scss files
    .pipe(sass())
    //then pipes files into the sass() plugin
    .pipe(gulp.dest('site/css'));
    //the compiled results are piped into .dest method which creates files in the destination folder (site.css)
});

// Watch task
gulp.task('watch', function() {
//.task method creates a new task called watch
  gulp.watch('site/js/*.js', ['jshint']);
  //gulp will watch all script files in site/js, run jshint task if any files changed
  gulp.watch('site/scss/*.scss', ['sass']);
  //gulp will watch all Sass files in site/css, run sass task if any .scss files changed
});

// Default task
gulp.task('default', ['jshint', 'sass', 'watch']);

// Minify HTML - removes white spaces, concats, and optimizes images
gulp.task('html', function() {
//new task created called html
  return gulp.src('site/index.html')
  //that loads the index.html
    .pipe(minifyHTML())
    //the file is piped into the minifyHTML plugin
    .pipe(gulp.dest('build/'));
    //result is piped into .dest which creates a new file called index.html in the build directory
});