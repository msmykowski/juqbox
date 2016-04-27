require('../support/bluebird');
require('../spec_helper');
const {tables} = require('../../server/db.json');
const db = require('../../server/db');

let conn;

beforeAll(async (done) => {
  process.env.NODE_ENV = 'test';
  conn = await db.establishConnection();
  await db.init({tables}, conn);
  done();
});

afterAll(async (done) => {
  await db.drop('test', conn);
  await conn.close();
  process.env.NODE_ENV = 'development';
  done();
});
