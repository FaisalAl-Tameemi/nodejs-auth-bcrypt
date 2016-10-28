'use strict';

const bcrypt = require('bcrypt-nodejs');
const uuid = require('node-uuid');
const _ = require('lodash');

module.exports = (app) => {

  app.use((req, res, next) => {
    // check if a session has been enabled
    if(req.session){
      // check if there is a views counter
      if(req.session.views){
        ++req.session.views; // increment
      }else{
        req.session.views = 1; // set it to 1
      }
    }
    debugger;
    return next();
  });

  app.get('/signup', function(req, res) {
    res.render('signup', { message: req.flash('signupMessage') });
  });

  // uncomment when using passportJS
  // app.post('/signup', passport.authenticate('local-signup', {
  //   successRedirect : '/profile',
  //   failureRedirect : '/signup',
  //   failureFlash : true
  // }));

  /*************************/
  const users = [];

  app.post('/signup', (req, res) => {
    const newUser = {
      id: uuid.v4(),
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password)
    };
    users.push(newUser);
    req.flash('newUserEmail', newUser.email);
    req.flash('newUserPassword', newUser.password);
    res.redirect('success');
  });

  app.get('/success', function(req, res){
    res.render('success', {
      email: req.flash('newUserEmail'),
      password: req.flash('newUserPassword')
    });
  })
  /*************************/

  app.get('/login', function(req, res) {
    res.render('login', { message: req.flash('loginMessage') });
  });

  app.post('/login', (req, res) => {
    const user = _.find(users, ['email', req.body.email]);
    if(user){
      const isCorrect = bcrypt.compareSync(req.body.password, user.password);
      // if the password is correct
      if(isCorrect){
        return res.redirect('login_success');
      }
      // otherwise
      req.flash('loginMessage', 'Incorrect password. Please retry.');
      return res.redirect('login');
    }else{
      req.flash('loginMessage', 'Please enter a valid email.');
      return res.redirect('login');
    }
  });

  app.get('/login_success', (req, res) => {
    res.render('login_success');
  })

  // uncomment when using passportJS
  // app.post('/login', passport.authenticate('local-signup', {
  //   successRedirect : '/profile',
  //   failureRedirect : '/login',
  //   failureFlash : true
  // }));

  app.get('/logout', function(req, res) {
    // req.logout();
    res.redirect('/');
  });

}
