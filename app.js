var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// import middleware here
const {userAuthenticate} = require('./middleware/userAuthenticate');

// 1. Import routers/endpoints here
var usersRoutes = require('./routes/usersRoutes');
var adminRouter = require('./routes/adminRoutes');
var feedbackRoutes = require('./routes/feedbackRoutes');
var bookingsRoutes = require('./routes/bookingsRoutes');
var timesheetsRoutes = require('./routes/timesheetsRoutes');
var tasksRoutes = require('./routes/tasksRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 2. Add routes/endpoints here
app.use('/admin', adminRouter);
app.use('/', usersRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/bookings', bookingsRoutes);
app.use('/timesheets', timesheetsRoutes);
app.use('/tasks', tasksRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
