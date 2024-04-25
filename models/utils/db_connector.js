const sqlite3 = require('sqlite3').verbose();

const DB_NAME = '<path_to_db>';

const db = function (){
    return new sqlite3.Database(DB_NAME, (err)=>{
        if (!err){
            console.log("db connection ACTIVE");
        }else{
            // retry
            console.log(err);
        }
    });
};

module.exports = db;
