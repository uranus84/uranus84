var LocalStrategy = require('passport-local').Strategy;
var dbConnection = require('./index.js');

dbConnection.query('USE heroku_49fb8337b7fd0ce');  

// use module exports to IIFEify the function once in server file
module.exports = function(passport) {

  // passport needs to be able to serialize and deserialize
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    connection.query(`SELECT * FROM users WHERE id = ${id}`,function(err,rows) { 
      done(err, rows[0]);
    });
  });


// naming signup and login strategies

  passport.use('local-signup', new LocalStrategy(
    function(req, username, password, done) {
      // check if user already exists
      connection.query(`SELECT * FROM users WHERE username = '${username}'`, function(err, rows) {

        if (err) { return done(err); }

        if (rows.length) {
          return done(null, false, req.flash('signupMessage', 'That username is already taken.')); // req.flash is the way to set flashdata using connect-flash
        } else {
          // if there is no user with that username create the user
          var newUserMysql = {
            username: username,
            password: password
          }
        
          var insertQuery = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
          connection.query(insertQuery, function(err,rows){
            newUserMysql.id = rows.insertId;
            return done(null, newUserMysql);
          }); 
        }
      });
    }
  ));

  passport.use('local-login', new LocalStrategy(
    function(req, username, password, done) {

      connection.query(`SELECT * FROM users WHERE username = '${username}'`,function(err,rows) {

        if (err) { return done(err); }

        if (!rows.length) {
          return done(null, false, req.flash('loginMessage', 'No user found.'));
        } 
        
        // if the user is found but the password is wrong
        if (!( rows[0].password == password)) {
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        }
        // everything ok, return successful user
        return done(null, rows[0]);
      });
    }
  ));

};