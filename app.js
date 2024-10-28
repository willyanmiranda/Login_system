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

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');

app.use('/api', authRoutes);
app.use('/api', productRoutes); 
app.use('/api', userRoutes); 

app.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.redirect('/dashboard'); 
  } else {
    res.redirect('/user/login'); 
  }
});

module.exports = app;