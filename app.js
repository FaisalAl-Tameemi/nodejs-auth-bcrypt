'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const mongoose = require('mongoose');

const db_configs = require('./configs/db');
const PORT = 9000;
// require('./config/passport')(passport);

// connect to mongoDB using mongoose
mongoose.connect(db_configs.mongo_uri);

// add passport strategies
require('./lib/passport')(passport);

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session and passport middleware
app.use(session({ secret: 's$Uup3RSecre+M$22G' }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

// Setup auth routes
require('./routes/auth')(app, passport);

// Setup the routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   let err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

app.listen(PORT);

module.exports = app;
