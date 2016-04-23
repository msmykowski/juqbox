const r = require('rethinkdb');

async function init(name, tables, conn) {
  try {
    await r.dbCreate(name).run(conn)
  } catch (err) {
    console.log(err);
  }
  try {
    for (let table of tables) {
      await r.tableCreate(table).run(conn);
    }
  } catch (err) {
    console.log(err);
  }
  return;
}

// export { connect };
