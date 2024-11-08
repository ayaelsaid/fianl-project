const express = require('express');
const path = require('path');
const session = require('express-session');
const ejs = require('ejs');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const ejsLayouts = require('express-ejs-layouts');
const passport = require('passport');
require('dotenv').config();
const http = require('http');



const PORT = process.env.PORT || 3000;

require('./config/passportConfig')(passport); // Adjust path as needed


const app = express();

const server = http.createServer(app);
const chatSockets  = require('./sockets/chatSocket');

const db = process.env.DB;



mongoose.connect(db)
.then(() => console.log('mongo db connectected'))
.catch(err => console.log(err));
// Use express-ejs-layouts middleware

app.use(ejsLayouts);

app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, '/views'));


// Serve static files (optional)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(session({
  secret: process.env.KEY_SESSION,
  resave: true,
  saveUninitialized: true,
}))
app.use(flash()); 
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');

  next();
});

app.use(passport.initialize());

app.use(passport.session());




app.use('/',   require('./routes/index'));

app.use('/auths', require('./routes/AuthRoute'));
app.use('/users', require('./routes/UsersRoute'));
app.use('/chat', require('./routes/chatingRoute'));
app.use('/request', require('./routes/RequestsRoute'));
chatSockets(server)
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
