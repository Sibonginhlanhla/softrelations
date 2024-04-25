const Database = require('better-sqlite3');
const DB_NAME = "./database/srdatabase.sqlite";

const db = new Database(DB_NAME);

const query = "SELECT * FROM admin";
const stm = db.prepare(query);
const adminUsers = stm.all();

// to insert/delete (non-DML queries)
// 1. prepare stm incl. any placeholders(?)
// 2. stm.run(value,value,...)

console.log(adminUsers);

db.close()