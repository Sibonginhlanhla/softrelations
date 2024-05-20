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

    // Method to create a new booking
    create(bookingData) {
        const stmt = this.#db.prepare(
            'INSERT INTO bookings (carwash_slot, meal, user, created_at) VALUES (?, ?, ?, ?)'
        );
        const info = stmt.run(
            bookingData.carwash_slot,
            bookingData.meal,
            bookingData.user,
            bookingData.created_at
        );
        return info.lastInsertRowid;
    }

    // Add other methods as needed
};
