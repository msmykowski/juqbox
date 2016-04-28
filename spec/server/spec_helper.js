require('../support/bluebird');
require('../spec_helper');
const {tables} = require('../../server/db.json');
const db = require('../../server/db');

let conn;

beforeAll(async (done) => {
  conn = await db.establishConnection();
  const dbs = await db.listDbs(conn);
  if (dbs.includes('test')) await db.drop('test', conn);
  await db.init({tables}, conn);
  done();
});

afterAll(async (done) => {
  await db.drop('test', conn);
  await conn.close();
  done();
});
