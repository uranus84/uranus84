import React from 'react';
import moment from 'moment';

function TodaysChoreEntry({ chore, index, handleCompletion, editChore, currDate }) {
  // future implementation will store frequencies in DB with first letter capitalized.
  // for now, we can capitalize it on the client end
  const choreFreq = `${chore.frequency.charAt(0).toUpperCase()}${chore.frequency.slice(1)}`;
  // dynamic classNames for overdue status and completed status
  let isOverdue = '';
  let isCompleted = '';
  let lastCompleted = '';

  if (moment(chore.next_date).isBefore(currDate)) {
    isOverdue = ' overdue';
  }
  if (chore.completed === '1') {
    isOverdue = '';
    isCompleted = ' completed';
  }
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
  return (
    <div className={`${'today-chore-entry'}${isOverdue}${isCompleted}`}>
      <input
        className="done"
        type="checkbox"
        checked={chore.completed === '1'}
        onChange={() => handleCompletion('todaysChores', index)}
      />
      <span onClick={() => editChore(index)}>
        <span className={`${'chore-name'}${isCompleted}`}>{chore.chore_name}</span>
        <span className="chore-freq">{choreFreq}</span>
        <span className="chore-due">
          Due {moment(chore.next_date)
            .calendar(null, {
              lastDay: '[Yesterday]',
              sameDay: '[Today]',
              nextDay: '[Tomorrow]',
              lastWeek: '[last] dddd',
              nextWeek: 'dddd',
              sameElse: 'L',
            })
          }
        </span>
        <span className="chore-last-done">
          {lastCompleted}
        </span>
      </span>
    </div>
  );
}

export default TodaysChoreEntry;
