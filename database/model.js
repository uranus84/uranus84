const db = require('./index.js');
const Promise = require('bluebird');
// const slice = require('array-slice');
const moment = require('moment');

// response to client in the JSON data format {todayChores:[ ], futureChores: [ ] }

// future implementations should move the res.json and res.send out from these
// methods and into the server routes
const getChores = (req, res, userId) => {
  const currDate = moment().format('YYYY-MM-DD');
  const data = {
    todayChores: [],
    futureChores: [],
  };

  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM chores WHERE user_id = ${userId}`, (err, chores) => {
      if (err) {
        return reject(err);
      }
      for (let i = 0; i < chores.length; i += 1) {
        const obj = {
          id: chores[i].id,
          chore_name: chores[i].chore_name,
          next_date: moment(chores[i].next_date).format('YYYY-MM-DD'),
          frequency: chores[i].frequency,
          last_date_completed: chores[i].last_date_completed,
          completed: chores[i].completed,
        };
        // reformat last_date_completed if not null
        if (obj.last_date_completed) {
          obj.last_date_completed = moment(obj.last_date_completed).format('YYYY-MM-DD');
        }
        if (moment(obj.next_date).isSameOrBefore(currDate)) {
          data.todayChores.push(obj);
        } else {
          data.futureChores.push(obj);
        }
      }
      res.json(data);
      return resolve(chores);
    });
  });
};

const postChores = (req, res, chore, userId) => {
  return new Promise((resolve, reject) => {
    const insertQuery = `INSERT INTO chores (chore_name, next_date, frequency, last_date_completed, completed, user_id) VALUES ('${chore.chore_name}', '${chore.next_date}', '${chore.frequency}', NULL, false, '${userId}')`;
    db.query(insertQuery, (err, result) => {
      if (err) {
        return reject(err);
      }
      res.send('successful post chore');
      return resolve(result);
    });
  });
};

const deleteChores = (req, res) => {
  return new Promise((resolve, reject) => {
    const deleteQuery = `DELETE FROM chores WHERE id = '${req.body.id}'`;
    db.query(deleteQuery, (err, result) => {
      if (err) {
        return reject(err);
      }
      res.json('deleted the requested chores');
      return resolve(result);
    });
  });
};

const updateChores = (req, res) => {
  let newDate;
  let freq = '';

  return new Promise((resolve, reject) => {
    // a future implementation should have a custom frequency selector, which will
    // make this math trickier to implement
    const selectQuery = `SELECT next_date, frequency FROM chores WHERE id = '${req.body.id}'`;
    db.query(selectQuery, (err, chores) => {
      if (err) {
        return reject(err);
      }
      freq = chores[0].frequency;
      if (freq === 'daily') {
        newDate = moment().add(1, 'days').format('YYYY-MM-DD');
      } else if (freq === 'weekly') {
        newDate = moment().add(7, 'days').format('YYYY-MM-DD');
      } else if (freq === 'bi-weekly') {
        newDate = moment().add(14, 'days').format('YYYY-MM-DD');
      } else if (freq === 'monthly') {
        newDate = moment().add(1, 'month').format('YYYY-MM-DD');
      }
      const updateQuery = `UPDATE chores SET next_date = '${newDate}', last_date_completed = '${moment().format('YYYY-MM-DD')}' WHERE id = '${req.body.id}'`;

      db.query(updateQuery, (error, results) => {
        if (err) {
          return reject(err);
        }
        res.json('chore completed');
        return resolve(results);
      });
    });
  });
};

const editChores = (req, res) => {
  const chore = req.body;
  return new Promise((resolve, reject) => {
    const updateQuery = `UPDATE chores SET next_date = '${chore.next_date}', chore_name = '${chore.chore_name}', frequency = '${chore.frequency}' WHERE id = '${req.body.id}'`;
    db.query(updateQuery, (error, results) => {
      if (error) {
        return reject(error);
      }
      res.json('data edited Successfully');
      return resolve(results);
    });
  });
};


module.exports.postChores = postChores;
module.exports.getChores = getChores;
module.exports.deleteChores = deleteChores;
module.exports.updateChores = updateChores;
module.exports.editChores = editChores;

