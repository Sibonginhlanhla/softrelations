/**
 * Schema for users
 */

module.exports = class UserRepo{
    constructor(){

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

