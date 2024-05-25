const Database = require('better-sqlite3');
const DB_NAME = './models/database/srdatabase.sqlite';

/**
 * Schema for feedback
 */

module.exports = class FeedbackModel{
    #db; // private 

    constructor(){
        this.#db = new Database(DB_NAME);
        console.log("db connected, from FeedbackModel");
        //console.log(this.#db.prepare('SELECT * FROM feedback').all());
    }
    
    postFeeback(rate,comment,from,to){
        let query = "INSERT INTO feedback (rating,comments,createdBy,feedbackFrom,feedbackTo) VALUES (?,?,?,?,?)";
        const result = this.#db.prepare(query).run(rate,comment,from,from,to);
        //console.log(this.#db.prepare('SELECT * FROM feedback').all());
        return true;
    }
    
    getUserID(userEmail){
        const query = "SELECT userId FROM users WHERE email=?";
        const userID = this.#db.prepare(query).get(userEmail);
        
        return userID;
    }

    getUserFeedBacks(userEmail){
        const query = "SELECT rating,comments,feedbackTo FROM feedback WHERE createdBy=?";
        const result = this.#db.prepare(query).all(userEmail);
        return result;
    }

    getUserFeedBacksTo(userEmail){
        const query = "SELECT rating,comments,createdBy FROM feedback WHERE feedbackTo=?";
        const result = this.#db.prepare(query).all(userEmail);
        return result;
    }

    getUserFeedBacksThree(){
        const query = "SELECT rating,comments,createdBy, feedbackTo FROM feedback";
        const result = this.#db.prepare(query).all();
        return result;
    }

    getAllUsersEmails(){
        let query = "SELECT email FROM users";
        const users = this.#db.prepare(query).all();
        return users;
    }

    getUserRole(userEmail){
        const query = "SELECT roleName FROM users WHERE email=?";
        const userRole = this.#db.prepare(query).get(userEmail);
        
        return userRole;
    }
}