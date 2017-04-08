'use strict';
var gulp            = require('gulp');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');

gulp.task('sass', function () {
    return gulp.src('./src/admin/**/*.scss')
               .pipe(sass().on('error', sass.logError))
               .pipe(autoprefixer(['last 2 versions', 'ie 8', 'ie 9']))
               .pipe(gulp.dest('./dist/admin'));
});

gulp.task('copy', function () {
    return gulp.src(['./src/admin/**/*.*','!./src/admin/**/*.s*ss'])
               .pipe(gulp.dest('./dist/admin'));
});

gulp.task('dev', ['sass', 'copy']);
