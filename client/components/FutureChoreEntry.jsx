import React from 'react';
import moment from 'moment';

function FutureChoreEntry({ chore, index, handleCompletion }) {
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
        onChange={() => handleCompletion(index)}
      />
      <span className="chore-name">{chore.chore_name}</span>
      <span className="chore-freq">{chore.frequency}</span>
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
    </div>
  );
}

export default FutureChoreEntry;
