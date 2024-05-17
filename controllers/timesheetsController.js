const TimesheetsModel = require("../models/TimesheetsModel");
var timesheetsModel = new TimesheetsModel();

const get_user_timesheet_page =(req, res, next)=>{
    const user = req.user;
    res.locals.user = user;
    res.render('timesheet');
}

module.exports = {
    get_user_timesheet_page
}