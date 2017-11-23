var LocalStrategy = require('passport-local').Strategy;
var dbConnection = require('./index.js');
const flash = require('connect-flash');

dbConnection.query('USE choreApp');

// use module exports to IIFEify the function once in server file
module.exports = function(passport) {

  // passport needs to be able to serialize and deserialize
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    dbConnection.query(`SELECT * FROM users WHERE id = ${id}`,function(err,rows) {
      done(err, rows[0]);
    });
  });


// naming signup and login strategies

  passport.use('local-signup', new LocalStrategy({ passReqToCallback: true },
    function(req, username, password, done) {
      // check if user already exists
      console.log('In signup auth');
      dbConnection.query(`SELECT * FROM users WHERE user_name = '${username}'`, [username], function(err, rows) {

        if (err) {
          console.log('oh god the pain');
          return done(err);
        }

        if (rows.length) {
          console.log('Username taken');
          return done(null, false, req.flash('signupMessage', 'That username is already taken.')); // req.flash is the way to set flashdata using connect-flash
        } else {
          // if there is no user with that username create the user
          var newUserMysql = {
            username: username,
            password: password
          }
        
          var insertQuery = `INSERT INTO users (user_name, password) VALUES ('${username}', '${password}')`;
          dbConnection.query(insertQuery, [newUserMysql.username, newUserMysql.password], function(err,rows){
            newUserMysql.id = rows.insertId;
            console.log('Making new user');
            return done(null, newUserMysql);
          }); 
        }
      });
    }
  ));

  passport.use('local-login', new LocalStrategy({ passReqToCallback: true },
    function(req, username, password, done) {

      dbConnection.query(`SELECT * FROM users WHERE user_name = '${username}'`, [username], function(err,rows) {

        if (err) {
          return done(err);
        }

        if (!rows.length) {
          console.log('Fails to find user.')
          return done(null, false, req.flash('loginMessage', 'No user found.'));
        } 
        
        // if the user is found but the password is wrong
        if (!( rows[0].password == password)) {
          console.log('Found user, incorrect password');
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        }
        // everything ok, return successful user
        console.log('All gucci, send it through');
        return done(null, rows[0]);
      });
    }
  ));

};