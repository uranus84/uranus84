import React from 'react';
import PropTypes from 'prop-types';

function TodaysChoreEntry({ chore }) {
  return (
    <div className="todays-chore-entry">
      <span>{chore.chore_name}</span>
      <span>{chore.next_date}</span>
      <span>{chore.frequency}</span>
    </div>
  );
}

TodaysChoreEntry.propTypes = {
  chore: PropTypes.object.isRequired,
};

export default TodaysChoreEntry;
