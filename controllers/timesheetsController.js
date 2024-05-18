const TimesheetsModel = require("../models/TimesheetsModel");
var timesheetsModel = new TimesheetsModel();

const get_user_timesheet_page =(req, res, next)=>{
    res.render('timesheet');
}

const post_user_timesheet = (req, res)=>{
    const task = req.body.taskDone;
    const hours = parseInt(req.body.hoursSpent);
    const date = req.body.dateOfEntry
    const user = req.user.userId;
    const response = timesheetsModel.addOnTimeSheet(date,task,hours,user);
    
    res.json(response);
    
}

module.exports = {
    get_user_timesheet_page,
    post_user_timesheet
}