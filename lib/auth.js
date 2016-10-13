'use strict';

/**
  What is this file?

  Helper functions for user auth purposes.
*/

// For a given request, checks if the user is logged in already
const isLoggedIn = (req, res, next) => {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
      return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = {
  isLoggedIn
};
