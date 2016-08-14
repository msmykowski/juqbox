let r;

module.exports = {
  connect: () => {
    r = require('rethinkdbdash')();
  },

  init: async({name, tables}) => {
    let db;
    const dbName = name || process.env.NODE_ENV;
    try {
      db = await r.dbCreate(dbName).run();
      for (let table of tables) {
        await r.db(dbName).tableCreate(table).run();
      }
    } catch (err) {
      throw(err);
    }
    return db;
  },

  changes: async({name, tableName}, cb) => {
    const dbName = name || process.env.NODE_ENV;
    return await r.db(dbName).table(tableName).changes().run(cb);
  },

  get: async({name, tableName, id}) => {
    const dbName = name || process.env.NODE_ENV;
    return await r.db(dbName).table(tableName).get(id).run();
  },

  insert: async({name, tableName, data}) => {
    const dbName = name || process.env.NODE_ENV;
    return await r.db(dbName).table(tableName).insert(data).run();
  },

  update: async({name, tableName, id, data}) => {
    const dbName = name || process.env.NODE_ENV;
    return await r.db(dbName).table(tableName).get(id).update(data).run();
  },

  listDbs: async() => {
    return await r.dbList().run();
  },

  append: async({name, tableName, property, id, data}) => {
    const dbName = name || process.env.NODE_ENV;
    return await r.db(dbName).table(tableName).get(id).update({
      [property]: r.row(property).append(data)
    }).run();
  },

  drop: async(name) => {
    await r.dbDrop(name).run();
  }
};
