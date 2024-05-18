const Database = require('better-sqlite3');
const DB_NAME = './models/database/srdatabase.sqlite';

/**
 * Schema for users
 */

module.exports = class PermissionsModel{
    #db; // private 

    constructor(){
        this.#db = new Database(DB_NAME);
        console.log("db connected, from PermissionsModel");
    }
    /**
     * Returns true if user has permission to access endpoint
     */
    hasEndpointPermission(_userId, _role, _url, _method){
        let query = "SELECT * FROM defaultpermissions WHERE apiPathSubDir=? AND roleName=? AND httpMethod=?";

        query = "SELECT * FROM newpermissions INNER JOIN defaultpermissions ON ";

        query = ""
        //const user = this.#db.prepare(query).get(_id, _id);

        return true;
    }
}