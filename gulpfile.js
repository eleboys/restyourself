'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var runSequence	    = require('run-sequence');
var browserSync     = require('browser-sync').create();
var exec            = require('child_process').exec;

var adminFiles = ['./src/admin/**/*.*', '!./src/admin/**/*.s*ss'];

gulp.task('sass', function () {
  return gulp.src('./src/admin/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 2 versions', 'ie 8', 'ie 9']))
    .pipe(gulp.dest('./dist/admin'))
    .pipe(browserSync.stream());

});

gulp.task('copy:admin', function () {
  return gulp.src(adminFiles)
    .pipe(gulp.dest('./dist/admin'));
});

gulp.task('copy:server', function () {
  return gulp.src(['./src/server/**/*.json'])
    .pipe(gulp.dest('./dist/server'));
});

gulp.task('reload', function () {
  browserSync.reload();
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: "./dist/admin"
    }
  });

  gulp.watch(adminFiles, runSequenceTaskAndReloadBrowser('copy:admin'));
  gulp.watch('./src/admin/**/*.scss', ['sass'])
});


gulp.task('run-server', () => {

});

gulp.task('dev', callback => {
	runSequence('sass', 'copy:admin', 'copy:server', 'serve');
});


function runSequenceTaskAndReloadBrowser(taskName) {
	return function() {
		runSequence(taskName, function(){
			browserSync.reload()
		});
	}
}
