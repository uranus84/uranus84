const db = require('./index.js');
const Promise = require('bluebird');
const slice = require('array-slice');
const moment = require('moment');


// response to client in the JSON data format {todayChores:[ ], futureChores: [ ] }

const getChores = (req, res) => {
  console.log('im getchores');
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM chores WHERE next_date >= CURRENT_DATE()', (err, result) => {
      if (err) {
        return reject(err);
      }
      let data = {
        todayChores: [],
        futureChores: [],
      };
      const currDate = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
      for (let i = 0; i < result.length; i++) {
        let obj = {
          id: result[i].id,
          chore_name: result[i].chore_name,
          next_date: JSON.stringify(result[i].next_date).slice(1, 11),
          frequency: result[i].frequency,
          last_date_completed: result[i].last_date_completed,
          completed: result[i].completed,
        };
        if (JSON.stringify(currDate) === JSON.stringify(result[i].next_date).slice(0, 11) + '"') {
          data.todayChores.push(obj);
        } else {
          data.futureChores.push(obj);
        }
        obj = {};
      }
      res.json(data);
      console.log('data', data);
      return resolve(result);
    });
  });
};

const postChores = (req, res, dataToBeInserted) => {
//console.log('Im in database post chores', dataToBeInserted);
  return new Promise((resolve, reject) => {
    const insertQuery = `INSERT INTO chores (chore_name,next_date,frequency,last_date_completed,completed,user_id) VALUES ('${dataToBeInserted.chore_name}','${dataToBeInserted.next_date}', '${dataToBeInserted.frequency}',NULL, false, '${dataToBeInserted.user_id}')`;
    db.query(insertQuery, (err, result) => {
      if (err) {
        return reject(err);
      }
      //res.json('data posted successfully');
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
      //res.json('deleted the requested chores');
      return resolve(result);
    });
  });
};

const updateChores = (req, res) => {
  return new Promise((resolve, reject) => {
    let freq = '';
    let date = null;
    const selectQuery = 'SELECT next_date, frequency FROM chores WHERE id = 1';
    db.query(selectQuery, (err, result) => {
      if (err) {
        return reject(err);
      }
      //console.log(result[0].next_date, 'result');
      freq = result[0].frequency;
      date = result[0].next_date;
      //console.log('freq', freq);
      //console.log('date', date);
      if (freq === 'daily') {
      	let aDate = (JSON.stringify(result[0].next_date).slice(1, 11)).split('-');
        let newDate = moment([aDate[0], aDate[1] - 1, aDate[2]]).add(1, 'days').format('YYYY-MM-DD');
        //console.log(newDate);
        const updateQuery = `UPDATE chores SET  next_date ='${newDate}' where id = 1`;
        db.query(updateQuery, (err, result) => {
          if (err) {
            return reject(err);
          }
           //res.json('data Updated Successfully');
           console.log(result);
           return resolve(result);
        });
     }
     });
    
  });
};


module.exports.postChores = postChores;
module.exports.getChores = getChores;
module.exports.deleteChores = deleteChores;
module.exports.updateChores = updateChores;

