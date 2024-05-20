const TimesheetsModel = require("../models/TimesheetsModel");
var timesheetsModel = new TimesheetsModel();

const get_user_timesheet_page =(req, res, next)=>{
    const user = req.user;
    res.locals.user = user;
    res.render('timesheet');
}

const post_user_timesheet = (req, res)=>{
    const task = req.body.taskDone;
    const hours = parseInt(req.body.hourSpent, 10);
    console.log(hours);
    console.log(typeof hours);
    console.log(req.body.hourSpent)
    console.log(typeof req.body.hourSpent)
    const date = req.body.dateOfEntry
    const user = req.user.userId;
    const response = timesheetsModel.addOnTimeSheet(date,task,hours,user);
    
    res.json(response);
    
}

const get_user_timesheets = (req, res)=>{
    const userID = req.user.userId;
    try {
        const timesheets = timesheetsModel.getUserTimeSheets(userID);
        res.json(timesheets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    get_user_timesheet_page,
    post_user_timesheet,
    get_user_timesheets
}