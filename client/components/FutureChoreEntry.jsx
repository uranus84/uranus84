import React from 'react';
import moment from 'moment';

function FutureChoreEntry({ chore, index, handleCompletion, editChore }) {
  const choreFreq = `${chore.frequency.charAt(0).toUpperCase()}${chore.frequency.slice(1)}`;
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
  return (
    <div className="row future-chore-entry">
      <input
        className="done"
        type="checkbox"
        checked={chore.completed === '1'}
        onChange={() => handleCompletion('futureChores', index)}
      />
      <span onClick={() => editChore(index)}>
        <span className="chore-name">{chore.chore_name}</span>
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

export default FutureChoreEntry;
