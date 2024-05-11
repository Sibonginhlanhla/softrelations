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
    addUser(_firstname, _lastname, _email, _role){

        let query = "SELECT * FROM users WHERE email=?";
        const user = this.#db.prepare(query).get(_email);
        
        if (user!=undefined){ //exists
            return {message: 'failed'};
        }
        // now add user
        if (_role=='Manager'){
            query = "INSERT INTO users (firstName, lastName, email, roleName) VALUES (?,?,?,?)";
            const result = this.#db.prepare(query).run(_firstname, _lastname, _email, _role);
        }
        else{
            // WILL ASSIGN RANDOM MANAGER NOW
            query = "SELECT * FROM users WHERE roleName='Manager'";
            const managers = this.#db.prepare(query).all();
            const managerId = (managers[(Math.floor(Math.random() * managers.length))]).userId;

            query = "INSERT INTO users (firstName, lastName, email, roleName, managerUserId) VALUES (?,?,?,?,?)";
            const result = this.#db.prepare(query).run(_firstname, _lastname, _email, _role, managerId);
        }

        return {message: 'success'};
    }
    getAllUsers(){
        // make db call
        // return user objects inside an array
    }
    addDefaultPermission(_userId, _role, _permissionName, _apiSubDirPath){
        // eg "view-all-timesheets" <=> "/timesheets/view/"
        return {message: "successs"}
    }

}