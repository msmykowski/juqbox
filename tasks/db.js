const gulp = require('gulp');
const db = require('../server/db');
const {tables} = require('../server/db.json');

gulp.task('db-init', async function() {
  const conn = await db.establishConnection();
  await db.init({tables}, conn);
  const playlist = {id: 1, entries: ['smoothJams', 'marvinGaye']};
  await db.insert({tableName: 'playlists', data: playlist}, conn);
  conn.close();
});

gulp.task('db-drop', async function() {
  const conn = await db.establishConnection();
  await db.drop('development', conn);
  conn.close();
});
