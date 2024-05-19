const Database = require('better-sqlite3');
const DB_NAME = './models/database/srdatabase.sqlite';

/**
 * Schema for timesheets
 */



module.exports = class TimesheetsModel{
    #db; // private 
    
    constructor(){
        this.#db = new Database(DB_NAME);
        console.log("db connected, from TimesheetsModel");   
    }
    
    addOnTimeSheet(dates,tasks,sixtys, users){
        let query = "INSERT INTO timesheets (completionDate, description, taskHours, assignedTo) VALUES (?,?,?,?)";
        const result = this.#db.prepare(query).run(dates,tasks,sixtys, users);
        console.log(this.#db.prepare('SELECT * FROM timesheets').all());
        return {message: 'success'};
        
    }

    getUserTimeSheets(userId){
        let query = "SELECT assignedTo, completionDate, description, taskHours from timesheets where assignedTo=?";
        const result = this.#db.prepare(query).all(userId);
        return result;
    }
    

    

    
}