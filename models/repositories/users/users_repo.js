/**
 * Here we import database connection function and objects(domain)
 * and describe methods for querying database. For users in this case.
 * e.g. insert_user(...),
 * get_user(...),
 * get_all_users(...),
 * delete_user(...),
 * create_user() and finally close_db_connection()
 */

// example

module.exports = function(this){
    self.connection; // = assign the db connection function here and any other relevant objects
    self.create_user = function(_firstname, _lastname, ){
        // make db call
    }
    self.get_all_users = function(){
        // make db call
        // collect & return user objects inside an array
    }

    
}

