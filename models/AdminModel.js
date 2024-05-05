const Database = require('better-sqlite3');
const DB_NAME = './models/database/srdatabase.sqlite';

/**
 * Schema for admin
 */

module.exports = class AdminModel{
    #db; // private 

    constructor(){
        this.#db = new Database(DB_NAME);
        console.log("db connected, from AdminModel");
    }
    
    /**
     * Verifies admin login details against database,
     * also updates admin status in database to logged in!
     * @param {Number} _adminId Admin's id 
     * @param {string} password Admin's password
     * @returns {boolean} Returns true if correct log in details are provided, or false otherwise
     */
    verifyPassword(adminId, passwordHash) {
        // check details against db id & password
        const query = "SELECT * FROM admin WHERE adminId=? AND password=?";
        const adminuser = this.#db.prepare(query).get(adminId, passwordHash);
        if (adminuser){
            return true;
        }
        return false;
    }
    
    /**
     * Document here
     */
    getAdminDetails(_adminId){

        const query = "SELECT * FROM admin";
        const adminUsers = this.#db.prepare(query).all();
        
        return adminUsers;
    }
    create_user(_firstname, _lastname, _email, _role){
        // make db call
    }
    get_all_users(){
        // make db call
        // return user objects inside an array
    }
    addDefaultPermission(_userId, _role, _permissionName, _apiSubDirPath){
        // eg "view-all-timesheets" <=> "/timesheets/view/"
        return {message: "successs"}
    }

}