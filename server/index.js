const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');

// Routing
const UsersRoute = require('./routes/usersRoute');
const AutoRoute = require('./routes/autoRoute');

const { PORT, DB_CONNECTION } = require('./constants');

mongoose.connect(
  DB_CONNECTION,
  { useNewUrlParser: true },
);

let db = mongoose.connection;

db.once('open', () => console.log('Connected to MongoDB'));
db.on('error', err => console.log(err));

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session Config
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 365 * 24 * 3600 * 1000 },
  }),
);

// Express Validator Middleware
app.use(
  expressValidator({
    errorFormatter: (param, msg, value) => {
      var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param: formParam,
        msg: msg,
        value: value,
      };
    },
  }),
);

// TODO: access control (IP)

// Passport Config
require('./config/passport')(passport);

// Passport Middleware
// req.user, req.isAuthenticated() - ways to know user info while cookie (maxAge) is valid
app.use(passport.initialize());
app.use(passport.session());

// Route Files
app.use(UsersRoute);
app.use(AutoRoute);

// Start Server
app.listen(PORT);
