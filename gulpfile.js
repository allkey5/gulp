var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass')(require('sass'));
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer')
var browserSync = require('browser-sync').create();
function css(done) {
  gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
      overrideBrowserslist:  ['last 2 versions'],
      cascade: false
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream())
  done()
}
function print (done) {
  console.log('hi');
  done()
}

function reload (done) {
  browserSync.reload();
  done()
}
function sync (done) {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  })
  done();
}
function watchFiles () {
  gulp.watch(["./**/*"], reload)
}
function watchSass() {
  gulp.watch("./scss/**/*", css);
}
gulp.task('default', gulp.parallel(sync, watchSass, css, watchFiles));