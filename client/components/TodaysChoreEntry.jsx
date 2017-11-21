import React from 'react';
import moment from 'moment';

function TodaysChoreEntry({ chore }) {
  return (
    <div className="row todays-chore-entry">
      <input className="done" type="checkbox" />
      <span className="chore-name">{chore.chore_name}</span>
      <span className="chore-last-done">{moment(chore.last_date_completed).calendar()}</span>
    </div>
  );
}

export default TodaysChoreEntry;
