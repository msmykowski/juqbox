const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('default', cb => runSequence('kill-servers', 'lint', 'spec-app', 'spec-s', 'kill-servers', 'exit', cb));
