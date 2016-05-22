require('../spec_helper');
const {tables} = require('../../server/db.json');
const db = require('../../server/db');

beforeAll(async (done) => {
  const dbs = await db.listDbs();
  if (dbs.includes('test')) await db.drop('test');
  await db.init({tables});
  done();
});
