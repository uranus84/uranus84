const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const passportLocal = require('../database/passport.js');

const app = express();

app.use(require('express-session')({
  secret: 'Shh, secret!',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.intialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + './../'));

app.get('/', (req, res) => res.send('Server Message!'));

app.get('/test', (req, res) => {
  console.log('test get gotten');
  res.send('Get request success!');
});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
