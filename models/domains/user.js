/** 
 * Domain classes are imported by repositories objects and routes
 * or any one that needs the data structures
 * 
 * here is a simple object representing user
 */

// example

module.exports = class User {
    constructor(_gid, _firstname, _lastname, _role, _emailaddress, _country){
        this.gId = _gId;
        this.userId
        this.firstName = _firstname; 
        this.lastName = _lastname;
        this.role = _role;
        this.emailAddress = _emailaddress;
    }
}