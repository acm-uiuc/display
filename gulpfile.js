var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var importCss = require('gulp-import-css');

gulp.task('bundle', function() {
    return browserify('./src/main.js')
    .transform('babelify', {presets: ['react']})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('sass', function() {
    return gulp.src('./sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(importCss())
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['bundle', 'sass']);
