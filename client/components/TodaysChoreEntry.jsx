import React from 'react';
import moment from 'moment';

<<<<<<< e90e7a5fd492cf6241c3c62c36d2b8e7ea917f23
function TodaysChoreEntry({ chore, index, handleCompletion }) {
  let lastCompleted;
  if (chore.last_date_completed !== null) {
    lastCompleted = 'Last completed ';
    lastCompleted += moment(chore.last_date_completed)
      .calendar(null, {
        lastDay: '[Yesterday]',
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        lastWeek: '[last] dddd',
        nextWeek: 'dddd',
        sameElse: 'L',
      });
  } else {
    lastCompleted = 'Never completed';
  }
=======
function TodaysChoreEntry({ chore, index, handleCompletion, editChore }) {
  console.log(chore.next_date_due);
>>>>>>> Can edit tasks
  return (
    <div className="row todays-chore-entry" onClick={() => editChore(index)}>
      <input
        className="done"
        type="checkbox"
        checked={chore.completed === '1'}
        onChange={() => handleCompletion(index)}
      />
      <span className="chore-name">{chore.chore_name}</span>
      <span className="chore-last-done">
        {lastCompleted}
      </span>
    </div>
  );
}

export default TodaysChoreEntry;
