const BookingsModel = require("../models/BookingsModel");
var bookingsModel = new BookingsModel();

const get_all_bookings = (req, res)=>{
    
    res.json({data:"All bookings"})
}

const get_bookings_page = (req, res)=>{
    res.render('bookings')
}

module.exports = {
    get_all_bookings, 
    get_bookings_page
}