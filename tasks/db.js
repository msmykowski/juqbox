const gulp = require('gulp');
const db = require('../server/db');
const {tables} = require('../server/db.json');
const runSequence = require('run-sequence');

gulp.task('db-init', async function() {
  await db.init({tables});
  const playlist = {id: 1, entries: ['smoothJams', 'marvinGaye']};
  await db.insert({tableName: 'playlists', data: playlist});
});

gulp.task('db-drop', async function() {
  await db.drop('development');
});

gulp.task('db-reset', cb => runSequence('db-drop', 'db-init', cb));
