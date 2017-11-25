const express = require('express');

const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

require('../database/passport.js')(passport);

const app = express();

// express stuff
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// passport stuff
app.use(cookieParser());
app.use(session({
  secret: 'Shh, secret!',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// initial static page
app.use(express.static(__dirname + './../'));

//////// Routes //////////
app.get('/', (req, res) => res.send('Server Message!'));

app.post('/signup', passport.authenticate('local-signup'), (req, res) => {
  console.log('Creating signup response');
  res.send(JSON.stringify({ view: 'home' }));
});

app.post('/login', passport.authenticate('local-login'), (req, res) => {
  console.log('Creating login response');
  res.send(JSON.stringify({ view: 'home' }));
});

app.get('/logout', (req, res) => {
  req.logout();
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.send(JSON.stringify({ view: 'login' }));
});

app.get('/test', (req, res) => {
	console.log('im success im server');
  res.send('Get request success!');
});

// Spin it up
let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
