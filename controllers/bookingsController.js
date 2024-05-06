const BookingsModel = require("../models/BookingsModel");
var bookingsModel = new BookingsModel();

const get_all_bookings = (req, res)=>{
    
    res.json({data:"All bookings"})
}

module.exports = {
    get_all_bookings
}