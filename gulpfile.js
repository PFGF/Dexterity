// Requires the gulp-sass plugin
var gulp = require('gulp');

// Requires the gulp-sass plugin
var sass = require('gulp-sass');

// Requires and creates the browser-sync plugin
var browserSync = require('browser-sync').create();

// Requires to use the useref plugin
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

// Requires the gulp-imagemin plugin
var imagemin = require('gulp-imagemin');

// Requires the gulp-cache plugin
var cache = require('gulp-cache');

// Requires the del plugin
var del = require('del');

// Requires the run-sequence plugin
var runSequence = require('run-sequence');

// Required for error handling
var pump = require('pump');

// Requires the gulp-htmlmin plugin
var htmlmin = require('gulp-htmlmin');

gulp.task('intro', function() {
    console.log('-- Gulp project started --');
});

gulp.task('sass', function(cb) {

    pump([
        gulp.src('app/assets/scss/**/*.scss'),
        sass(),
        gulp.dest('app/assets/css'),
        browserSync.reload({
          stream: true
        })
    ], cb);
});

gulp.task('image', function(cb){

    pump([
        gulp.src('app/assets/img/**/*.+(png|jpg|jpeg|gif|svg)'),
        // Caching images that ran through imagemin
        cache(imagemin({interlaced: true})),
        gulp.dest('dist/assets/img')
    ], cb);
});

gulp.task('font', function(cb) {

    pump([
        gulp.src('app/assets/font/**/*.+(eot|svg|ttf|woff)'),
        gulp.dest('dist/assets/font')
    ], cb);
});

gulp.task('video', function(cb) {

    pump([
        gulp.src('app/assets/video/**/*.+(mp4|m4v)'),
        gulp.dest('dist/assets/video')
    ], cb);
})

gulp.task('useref', function(cb){

    pump([
        gulp.src('app/*.html'),
        useref(),
        // Minifies only if it's a JavaScript file
        // Minifies only if it's a CSS file
        gulpIf('*.css', cssnano()),
        gulp.dest('dist')
    ], cb);
});

gulp.task('minifyHtml', () => {
  return gulp.src('dist/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
});

gulp.task('clean:dist', function() {
    return del.sync('dist');
});

gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
})

gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('app/assets/scss/**/*.scss', ['sass']);
    gulp.watch('app/assets/font/**/*.+(eot|svg|ttf|woff)', ['font']);
    gulp.watch('app/assets/video/**/*.+(mp4|m4v)', ['video']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/assets/js/**/*.js', browserSync.reload);
});

gulp.task('build', function (callback) {
    runSequence(
        'clean:dist',
        ['cache:clear', 'sass', 'useref', 'minifyHtml', 'image', 'font', 'video'],
        callback
    )
})

gulp.task('default', function (callback) {
    runSequence(
      ['sass','browserSync', 'watch'],
      callback
    )
})
