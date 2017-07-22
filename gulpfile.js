'use strict';
var gulp          = require('gulp');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var runSequence   = require('run-sequence');
var browserSync   = require('browser-sync').create();
var spawn         = require('child_process').spawn;
var connect       = require('gulp-connect');
var myip          = require('quick-local-ip');
var replace       = require('gulp-replace');
var argsv         = require('yargs').default(
{
  adminuiport:8989,
  adminport:3101,
  restport:3100,
  localip: myip.getLocalIP4()
}).argv;
var admin_node, server_node;

var adminFiles = ['./src/admin/**/*.*', '!./src/admin/**/*.s*ss'];
var serverFiles = ['./src/server/**/*.js'];

gulp.task('sass', function () {
  return gulp.src('./src/admin/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 2 versions', 'ie 8', 'ie 9']))
    .pipe(gulp.dest('./dist/admin'))
    .pipe(browserSync.stream());
});

gulp.task('copy:admin', function () {
  return gulp.src(adminFiles)
    .pipe(replace('{{ip-address-placeholder}}', argsv.localip, {skipBinary: true}))
    .pipe(replace('{{admin-port}}', argsv.adminport, { skipBinary: true }))
    .pipe(gulp.dest('./dist/admin'));
});

gulp.task('copy:server', function () {
  return gulp.src(serverFiles)
    .pipe(gulp.dest('./dist/server'));
})

gulp.task('reload', function () {
  browserSync.reload();
});

gulp.task('serve:dev', function () {
  browserSync.init({
    server: {
      baseDir: "./dist/admin/frontend"
    },
    port: argsv.adminuiport
  });

  gulp.watch(adminFiles, runSequenceTaskAndReloadBrowser('copy:admin'));
  gulp.watch('./src/admin/frontend/**/*.scss', ['sass'])
});

gulp.task('serve:dist', function () {
  connect.server({
    root: './dist/admin/frontend',
    port: argsv.adminuiport
  });
})


gulp.task('run-node:admin', () => {
  if (admin_node) admin_node.kill()
  admin_node = spawn('node', ['dist/admin/backend/admin.js',`--port=${argsv.adminport}`], {
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
  server_node = spawn('node', ['dist/server/index.js',`--port=${argsv.restport}`], {
    stdio: 'inherit'
  })
  server_node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('dev', callback => {
  runSequence('sass', 'copy:admin', 'copy:server', 'serve:dev', 'run-node:server', 'run-node:admin');

  gulp.watch('./src/server/**/*.js', function () {
    runSequence('copy:server','run-node:server' );
  });

  gulp.watch('./src/admin/backebd/**/*.js', function () {
    runSequence('copy:admin','run-node:admin' );
  });
});

gulp.task('dist', callback => {
  runSequence('sass', 'copy:admin', 'copy:server', 'serve:dist', 'run-node:server', 'run-node:admin');
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
