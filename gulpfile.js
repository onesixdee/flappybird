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
    //the compiled results are piped into gulp.dest method which creates files in the destination folder (site.css)
});

// Minify index - removes white spaces, concats, and optimizes images
gulp.task('html', function() {
//new task created called html
  return gulp.src('site/index.html')
  //that loads the index.html
    .pipe(minifyHTML())
    //the file is piped into the minifyHTML plugin
    .pipe(gulp.dest('build/'));
    //result is piped into gulp.dest which creates a new file called index.html in the build directory
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
//new task created called scripts
  return browserify('site/js/main.js')
  // runs browserify on js files 
    .bundle()
    //concatenates files in correct order
    .pipe(source('app.js'))
    //all code in js file will end up in a single file called app.js
    .pipe(buffer())
    .pipe(uglify())
    //piped into the uglify plugin which minifies JS code
    .pipe(gulp.dest('build/js'));
    //final result is piped into gulp.dest method that places file in the build/js directory
});

// Styles build task, concatenates all the files
gulp.task('styles', function() {
//new task created called styles
  return gulp.src('site/css/*.css')
  //.src method loads all of the CSS files 
    .pipe(concat('styles.css'))
    //the files are piped into the concat plugin which combines them all into a single file called styles.css
    .pipe(gulp.dest('build/css'));
    //style.css is then piped into gulp.dest, which creates the build/css directory and places the file there
});

// Image optimization task
gulp.task('images', function() {
//new task created  called images
  return gulp.src('site/img/*')
  //.src method lads all of the files in site/img
    .pipe(imagemin())
    //the images are piped into the imagemin plugin to be optimized
    .pipe(gulp.dest('build/img'));
    //results are piped into gulp.dest which places them into the destination directory, build/img
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

// Build task
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'styles', 'images']);