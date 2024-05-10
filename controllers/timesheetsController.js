const TimesheetsModel = require("../models/TimesheetsModel");
var timesheetsModel = new TimesheetsModel();

const get_user_timesheet_page =(req, res, next)=>{
    res.render('timesheet');
}

module.exports = {
    get_user_timesheet_page
}