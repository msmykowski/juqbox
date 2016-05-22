require('./spec_helper');
const r = require('rethinkdbdash')();
const db = require('../../server/db');

describe('Db', () => {
  describe('#init and #drop', () => {
    beforeEach(async(done) => {
      await db.init({name: 'testDB', tables: ['moretest', 'testtest']});
      done();
    });

    it('creates the database with tables', async(done) => {
      let dbs = await r.dbList().run();
      let lastCreatedDb = dbs.pop();
      expect(lastCreatedDb).toEqual('testDB');

      await db.drop('testDB');

      dbs = await r.dbList().run();
      lastCreatedDb = dbs.pop();
      expect(lastCreatedDb).not.toEqual('testDB');

      done();
    });
  });
});
