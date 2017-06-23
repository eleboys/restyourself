'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var spawn = require('child_process').spawn;
var ts = require('gulp-typescript');
var connect = require('gulp-connect');
var admin_node, server_node;

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

gulp.task('reload', function () {
  browserSync.reload();
});

gulp.task('serve:dev', function () {
  browserSync.init({
    server: {
      baseDir: "./dist/admin"
    },
    port: 8989
  });

  gulp.watch(adminFiles, runSequenceTaskAndReloadBrowser('copy:admin'));
  gulp.watch('./src/admin/**/*.scss', ['sass'])
});

gulp.task('serve:dist', function () {
  connect.server({
    root: './dist/admin',
    port: 8989
  });
})

gulp.task('tsc', function () {
  return gulp.src('src/server/**/*.ts')
    .pipe(ts({
      noImplicitAny: true
    }))
    .pipe(gulp.dest('dist/server'));
});

gulp.task('run-node:admin', () => {
  if (admin_node) admin_node.kill()
  admin_node = spawn('node', ['dist/server/admin.js'], {
    stdio: 'inherit'
  })
  admin_node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('run-node:server', () => {
  if (server_node) server_node.kill()
  server_node = spawn('node', ['dist/server/index.js'], {
    stdio: 'inherit'
  })
  server_node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('dev', callback => {
  runSequence('sass', 'copy:admin', 'serve:dev','tsc', 'run-node:server', 'run-node:admin');

  gulp.watch('./src/server/*.ts', function () {
    runSequence('tsc','run-node:server','run-node:admin' );
  });
});

gulp.task('dist', callback => {
  runSequence('sass', 'copy:admin', 'serve:dist', 'tsc', 'run-node:server', 'run-node:admin');
});


function runSequenceTaskAndReloadBrowser(taskName) {
  return function () {
    runSequence(taskName, function () {
      browserSync.reload();
    });
  }
}

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (admin_node) admin_node.kill();
    if (server_node) server_node.kill();
})
