const Database = require('better-sqlite3');
const DB_NAME = './models/database/srdatabase.sqlite';

/**
 * Schema for bookings
 */
module.exports = class BookingsModel {
    #db; // private

    constructor() {
        this.#db = new Database(DB_NAME);
        console.log("db connected, from BookingsModel");
    }

    addBooking(user, bookingType, bookingDescription, date) {
        const query = "INSERT INTO bookingoptions (bookingType, bookingDescription, availabilityDateTime, bookedBy) VALUES (?, ?, ?, ?)";
        const result = this.#db.prepare(query).run(bookingType, bookingDescription, date, user);
        console.log(this.#db.prepare('SELECT * FROM bookingoptions').all());
        return {message: 'success'};
        
    }
    
    
    
    
    
    getUserBookings(userId) {
        let query = "SELECT bookedBy, bookingType, bookingDescription, availabilityDateTime FROM bookingoptions WHERE bookedBy=?";
        const result = this.#db.prepare(query).all(userId);
        return result;
    }
    

    // Add other methods as needed
};
