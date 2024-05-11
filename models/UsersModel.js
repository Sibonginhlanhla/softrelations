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
    getUserDetails(_id){
        let query = "SELECT * FROM users WHERE googleId=? OR userId=?";
        const user = this.#db.prepare(query).get(_id, _id);
        if (user){
            return user;
        }
        return undefined;
    }
    registerUser(_user_g_id, _user_g_email){
        let query = "SELECT * FROM users WHERE email=?";
        const user = this.#db.prepare(query).get(_user_g_email);
        
        if (user){
            // check if alreafy registered
            if (user.googleId){
                return true;
            }
            // else add the googleId for the user
            query = "UPDATE users SET googleId=? WHERE email=?";
            this.#db.prepare(query).run(_user_g_id, _user_g_email);
            return true;
        }
        return false;
    }
    /**
     * Call this after you done with the operations
     */
    close_db_conn(){
        dbConnection.close();
    }
}

