const BookingsModel = require("../models/BookingsModel");
var bookingsModel = new BookingsModel();

const get_all_bookings = (req, res) => {
    res.json({ data: "All bookings" });
};

/*const get_bookings_page = (req, res) => {
    res.render('bookings');
};*/

const get_bookings_page =(req, res, next)=>{
    const user = req.user;
    res.locals.user = user;
    res.render('bookings');
}

const post_user_bookings = (req, res) => {
    const bookingType = req.body.bookingType;
    const bookingDescription = req.body.bookingDescription;
    const date = req.body.date;
    const user = req.user.userId;

    try {
        const response = bookingsModel.addBooking(user, bookingType, bookingDescription, date);
        res.json(response);
    } catch (error) {
        console.log(error); // Log error for debugging
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}


const get_user_bookings = (req, res) => {
    const userID = req.user.userId;
    try {
        console.log('Fetching bookings for user:', userID); // Debugging line
        const booking = bookingsModel.getUserBookings(userID);
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = {
    get_all_bookings,
    get_bookings_page,
    post_user_bookings,
    get_user_bookings
};
