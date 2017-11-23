-- DROP DATABASE IF EXISTS choreApp;

-- CREATE DATABASE choreApp;

-- USE choreApp;

CREATE TABLE users (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_name varchar(20) NOT NULL UNIQUE,
  password varchar(20)  NOT NULL
);

CREATE TABLE chores (
  id int  NOT NULL PRIMARY KEY AUTO_INCREMENT,
  chore_name  varchar(40)   NOT NULL,
  next_date date,
  frequency varchar(15),
  last_date_completed date DEFAULT NULL,
  completed varchar(10),
  user_id int,
  FOREIGN KEY (user_id) REFERENCES users(id)
);




/*  Execute this file from the command line by typing:
 *    mysql -u root < path of the this file/schema.sql
 *  to create the database and the tables.*/

/* Refactor to routing. File should be executed only once similarly to above
 * using ClearDB info from database/index.js. Should send seed data to ClearDB
 * database in heroku. Removed first lines due to assumed deprecation. Pending
 * further testing if needed.
 */
