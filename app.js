const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { add } = require('lodash');
const Blog = require('./models/blog');
const dbURI = require('./db');

// express app
const app = express();


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err) );

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

// middleware and static files
app.use(express.static('public'));
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result})
    })
    .catch((err) => {
      console.log(err);
    })
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});