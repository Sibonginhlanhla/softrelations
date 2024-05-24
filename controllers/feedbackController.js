const FeedbackModel = require("../models/FeedbackModel");
var feedbackModel = new FeedbackModel();

const get_user_feedbackpage = (req, res) => {
    const users = feedbackModel.getAllUsersEmails();

    // populate form select
    let select_template = "";
    users.forEach(user=>{
        select_template += `
            <option>
            ${user.email}
            </option>
        `
    });

    //pass templates/data to ejs
    res.locals.select_template = select_template;
    res.render('feedbacks');
}

const post_user_feedback = (req, res) => {
    const rate = req.body.feedBackRating;
    const comment = req.body.feedBack;
    const to = req.body.feedBackEmail;
    const from = req.user.userId;
    const toId = feedbackModel.getUserID(to);
    const added = feedbackModel.postFeeback(rate,comment,from,from,toId);

    if (added){
        res.json({message: 'success'});
    }else{
        res.json({message: 'failed'});
    }
}

module.exports = {
    get_user_feedbackpage,
    post_user_feedback
}