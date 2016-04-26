require('./spec_helper');
const r = require('rethinkdb');

describe('Db', () => {
  let db, conn;

  beforeEach(async(done) => {
    db = require('../../server/db');
    conn = await db.establishConnection();
    done();
  });

  afterEach(() => {
    conn.close();
  });

  describe('#establishConnection', () => {
    it('establishes a connection to the database', async(done) => {
      expect(conn.host).toEqual('localhost');
      expect(conn.port).toEqual(28015);
      done();
    });
  });

  describe('#init and #drop', () => {
    beforeEach(async(done) => {
      await db.init({name: 'testDB', tables: ['moretest', 'testtest']}, conn);
      done();
    });

    it('creates the database with tables', async(done) => {
      let dbs = await r.dbList().run(conn);
      let lastCreatedDb = dbs.pop();
      expect(lastCreatedDb).toEqual('testDB');

      await db.drop('testDB', conn);

      dbs = await r.dbList().run(conn);
      lastCreatedDb = dbs.pop();
      expect(lastCreatedDb).not.toEqual('testDB');

      done();
    });
  });
});
