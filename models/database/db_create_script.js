/** This script is not meant to be run, please leave as is */

const sqlite3 = require('sqlite3').verbose();

const DB_NAME = './srdatabase.sqlite';

function createTables(_db){
    _db.serialize(()=>{
        _db.exec(`
            CREATE TABLE IF NOT EXISTS admin (
                adminId INTEGER PRIMARY KEY,
                firstName TEXT NOT NULL,
                lastName TEXT NOT NULL,
                password TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE,
                isLoggedIn BOOLEAN NOT NULL
            );
            CREATE TABLE IF NOT EXISTS roles(
                roleName TEXT PRIMARY KEY
            );
            CREATE TABLE IF NOT EXISTS users (
                userId INTEGER PRIMARY KEY,
                googleId INTEGER UNIQUE,
                firstName TEXT NOT NULL,
                lastName TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                roleName TEXT,
                FOREIGN KEY(roleName) REFERENCES roles(roleName)
            );
            CREATE TABLE IF NOT EXISTS defaultpermissions(
                permission TEXT PRIMARY KEY,
                apiPathSubDir TEXT NOT NULL UNIQUE, -- e.g softrelations.com/admin/login => the '/admin' is a sub directory
                roleName TEXT,
                FOREIGN KEY(roleName) REFERENCES roles(roleName)
            );
            CREATE TABLE IF NOT EXISTS newpermissions(
                userId INTEGER,
                permission TEXT,
                FOREIGN KEY(permission) REFERENCES defaultpermissions(permission),
                FOREIGN KEY(userId) REFERENCES users(userID)
            );
        `,()=>{
            console.log("successful creating tables");
            // populate them (i.e. admin table for now, he has to login)
            populateTables(_db);
        })
    });
}
function populateTables(_db){
    _db.serialize(()=>{
        // default admin
        _db.run("INSERT INTO admin (adminId,firstName,lastName,email, password, isLoggedIn) VALUES(?,?,?,?,?,?)", [56412, "Tumelo", "Maapeya", "tumelo352515@gmail.com", "6d7b638a14619a0266de975325d3d86e", 0]);
    });
}
// create connection to db
const db = new sqlite3.Database(DB_NAME,(err)=>{
    if (!err){
        console.log("successful db creation/open");
        // can create tables and populate with initial records
        createTables(db);
    }else{
        console.log(err.message);
    }
});

db.close();