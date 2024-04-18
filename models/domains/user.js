/** 
 * Domain classes are imported by repositories objects and routes
 * or any one that needs the data structures
 * 
 * here is a simple object representing user
 */

// example

module.exports = function (_id, _firstname, _lastname, _role, _emailaddress, _country){
    this.id = _id;
    this.firstname = _firstname; 
    this.lastname = _lastname;
    this.role = _role;
    this.emailaddress = _emailaddress;
    this.country = _country;
}