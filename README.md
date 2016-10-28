
Hi folks,

Today we reviewed and discussed the following:

- ExpressJS Middleware
  - We did the example of simply counting the number of requests being made to our server using a simple middleware.
  ```javascript
  let counter = 0;

  // define the middleware
  // also use ES6 style functions, `() => {}` instead of `function(){}`
  app.use((req, res, next) => {
    // increment the counter
    counter++;
    console.log(`The server has recieved ${counter} requests`);
    // move on to the next middleware by calling the callback
    next();
  })
  ```
- Cookies vs Sessions
  - They both store information about users and allow us to get over the fact that HTTP is stateless
  - Cookies are saved in the browser
  - Sessions are saved in server
- ExpressJS Cookie Parser Middleware
- Submitting forms (login and signup)

We also discussed using `bcrypt` (an npm package) to allow us to do things such as encrypting a plain text password and then checking if login info the user types is actually inline with the user records in the backend.

When signing up:

```javascript
const bcrypt = require('bcrypt-nodejs');
const _ = require('lodash');

// empty list of users
const users = [];

// signup form
app.get('/signup', function(req, res) {
  res.render('signup', { message: req.flash('signupMessage') });
});

// a post request when saving user info from the signup form
app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password)
  };
  users.push(newUser);
  console.log(newUser);
  req.flash('newUserEmail', newUser.email);
  req.flash('newUserPassword', newUser.password);
  res.redirect('success');
});

// success page, used to demo `flash`
app.get('/success', function(req, res){
  res.render('success', {
    email: req.flash('newUserEmail'),
    password: req.flash('newUserPassword')
  });
});
```

And when the user is logging in, we did the following:

```javascript
// load the login form page
app.get('/login', function(req, res) {
  res.render('login', { message: req.flash('loginMessage') });
});

// submit the login form and check if the password matches
app.post('/login', (req, res) => {
  const user = _.find(users, ['email', req.body.email]);
  if(user){
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    // if the password is correct
    if(isCorrect){
      return res.redirect('login_success');
    }
    // otherwise, the passwords didn't match
    req.flash('loginMessage', 'Incorrect password. Please retry.');
    return res.redirect('login');
  }
  // otherwise, the user isn't found, i.e. email isn't valid
  req.flash('loginMessage', 'Please enter a valid email.');
  return res.redirect('login');
});

// login success page, (note: this isn't actually needed, was only for demo purposes)
app.get('/login_success', (req, res) => {
  res.render('login_success');
});
```

Cheers,
