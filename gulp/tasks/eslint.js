var gulp         = require('gulp'),
    eslint       = require('gulp-eslint'),
    cache        = require('gulp-cached'),
    handleErrors = require('../util/handleErrors');

gulp.task('eslint', function () {
  return gulp.src(paths.scripts)
    .pipe(handleErrors())
    .pipe(cache('eslint', {optimizeMemory: true}))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});