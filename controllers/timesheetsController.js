const TasksModel = require("../models/TasksModel");
var tasksModel = new TasksModel();

const get_user_timesheet_page =(req, res, next)=>{
    res.render('timesheet');
}

module.exports = {
    get_user_timesheet_page
}