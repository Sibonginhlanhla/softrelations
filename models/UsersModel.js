const Database = require('better-sqlite3');
const DB_NAME = './models/database/srdatabase.sqlite';

/**
 * Schema for users
 */

module.exports = class UsersModel{
    #db; // private 

    constructor(){
        this.#db = new Database(DB_NAME);
        console.log("db connected, from UserModel");
    }
    getUserDetails(_userId){
        // make call to get specific user details
        
        return {name: "John"};
    }
    /**
     * Call this after you done with the operations
     */
    close_db_conn(){
        dbConnection.close();
    }
}

