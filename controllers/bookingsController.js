const BookingsModel = require("../models/BookingsModel");
var bookingsModel = new BookingsModel();

const get_all_bookings = (req, res) => {
    res.json({ data: "All bookings" });
};

const get_bookings_page = (req, res) => {
    res.render('bookings');
};

const book_event = (req, res) => {
    const { carwash_slot, meal } = req.body;

    try {
        // Create a new booking object
        const newBooking = {
            carwash_slot,
            meal,
            user: req.user.id, // Assuming you have user info in req.user
            created_at: new Date().toISOString()
        };

        // Save the booking to the database
        bookingsModel.create(newBooking);

        // Send a success response
        res.json({ success: true, message: "Booking successful" });
    } catch (error) {
        console.error('Error booking event:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    get_all_bookings,
    get_bookings_page,
    book_event
};
