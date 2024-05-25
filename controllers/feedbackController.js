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
    const toId = feedbackModel.getUserID(to).userId;
    const added = feedbackModel.postFeeback(rate,comment,from,toId);
    console.log(to);
    console.log(toId);

    if (added){
        res.json({message: 'success'});
    }else{
        res.json({message: 'failed'});
    }
}

const get_user_feedback = (req, res) => {
    const id = feedbackModel.getUserID(req.user.email).userId;
    try {
        const feddbacks = feedbackModel.getUserFeedBacks(id);
        //console.log(feddbacks);
        res.json(feddbacks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const get_user_feedback_to = (req, res) => {
    const id = feedbackModel.getUserID(req.user.email).userId;
    try {
        const feddbacks = feedbackModel.getUserFeedBacksTo(id);
        res.json(feddbacks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const get_user_feedback_three = (req, res) => {
    try {
        const feddbacks = feedbackModel.getUserFeedBacksThree();
        res.json(feddbacks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const get_user_pfeedbacks = (req, res) => {
    res.render('pfeedbacks');
}

const get_user_pfeedbacks_two = (req, res) => {
    res.render('pfeedbacks2');
}

const get_user_pfeedbacks_three = (req, res) => {
    res.render('pfeedbacks3');
}

const get_user_role = (req, res) => {
    try {
        const role = feedbackModel.getUserRole(req.user.email);
        res.json(role);
    } catch (error) {
        res.json(500).json({error: error.message});
    }
    
}

module.exports = {
    get_user_feedbackpage,
    post_user_feedback,
    get_user_feedback,
    get_user_pfeedbacks,
    get_user_feedback_to,
    get_user_pfeedbacks_two,
    get_user_role,
    get_user_pfeedbacks_three,
    get_user_feedback_three
}