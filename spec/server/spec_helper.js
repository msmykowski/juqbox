require('../spec_helper');

beforeAll(async (done) => {
  const {tables} = require('../../server/db.json');
  const db = require('../../server/db');
  const dbs = await db.listDbs();
  if (dbs.includes('test')) await db.drop('test');
  await db.init({tables});
  done();
});
