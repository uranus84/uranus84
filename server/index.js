const express = require('express');

const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
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
app.use(flash());

// initial static page
app.use(express.static(__dirname + './../'));

//////// Routes //////////
app.get('/', (req, res) => res.send('Server Message!'));

app.get('/test', (req, res) => {
	console.log('im success im server');
  res.send('Get request success!');
});

// Spin it up
let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
