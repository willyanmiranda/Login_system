const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/html'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));

const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes'); 
app.use('/', authRoutes);
app.use('/', dashboardRoutes); 

app.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.redirect('/dashboard'); 
  } else {
    res.redirect('/login'); 
  }
});

module.exports = app;