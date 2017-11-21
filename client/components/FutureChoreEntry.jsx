import React from 'react';
import moment from 'moment';

function FutureChoreEntry({ chore }) {
  return (
    <div className="row future-chore-entry">
      <input className="done" type="checkbox" />
      <span className="chore-name">{chore.chore_name}</span>
      <span className="chore-freq">{chore.frequency}</span>
      <span className="chore-due">{moment(chore.next_date_due).calendar()}</span>
      <span className="chore-last-done">{moment(chore.last_date_completed).calendar()}</span>
    </div>
  );
}

export default FutureChoreEntry;
