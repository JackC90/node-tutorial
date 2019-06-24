const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Joi = require('joi');
const app = express();
const people = require('./routes/people');

// Middlewares
app.use('/public', express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Custom middleware
// - run this only when /example
app.use('/example', (req, res, next) => {
  console.log(req.url, req.method);
  req.banana = 'banana';
  next();
})

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
})

app.get('/example', (req, res) => {
  console.log(req.banana);
  res.send('Middleware');
})

app.get('/search/:userQuery', (req, res) => {
  res.render('index',
    { data:
      {
        isLoggedIn: true,
        userName: 'John Snow',
        userQuery: req.params.userQuery,
        searchResults: [
          'book1', 'book2', 'book3',
        ]
      }
    })
})

app.post('/', (req, res) => {
  console.log(req.body);
  const schema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(5).max(10).required()
  });
  Joi.validate(req.body, schema, (err, result) => {
    if (err) {
      console.log(err);
      res.json(err.details);
    }
  })
  // Database work

  // res.json({ success: true });
})

// Use Express Routes
app.use('/people', people);

app.listen(3000);