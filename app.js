'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const flash = require('connect-flash');
const session = require('express-session');

const PORT = 9000;

// add passport strategies
// uncomment lines below when enabling passport for authentication
// const passport = require('passport');
// require('./config/passport')(passport);
// require('./lib/passport')(passport);

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
app.use(session({
  name: 'node_auth_app_cookie',
  secret: 's$Uup3RSecre+M$22G'
}));
// uncomment lines below when enabling passport for authentication
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
app.use(flash());

// Setup auth routes
require('./routes/auth')(app);

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
