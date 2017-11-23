import React from 'react';
import moment from 'moment';

function FutureChoreEntry({ chore, index, handleCompletion }) {
  return (
    <div className="row future-chore-entry">
      <input
        className="done"
        type="checkbox"
        checked={chore.completed}
        onChange={() => handleCompletion(index)}
      />
      <span className="chore-name">{chore.chore_name} |</span>
      <span className="chore-freq">| {chore.frequency} |</span>
      <span className="chore-due">
        | Due {moment(chore.next_date)
          .calendar(null, {
            lastDay: '[Yesterday]',
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            lastWeek: '[last] dddd',
            nextWeek: 'dddd',
            sameElse: 'L',
          })
        } |
      </span>
      <span className="chore-last-done">
        | Last Completed {moment(chore.last_date_completed).fromNow()}
      </span>
    </div>
  );
}

export default FutureChoreEntry;
