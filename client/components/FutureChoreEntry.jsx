import React from 'react';
import PropTypes from 'prop-types';

function FutureChoreEntry({ chore }) {
  return (
    <div className="future-chore-entry">
      <span>{chore.chore_name}</span>
      <span>{chore.next_date}</span>
      <span>{chore.frequency}</span>
    </div>
  );
}

FutureChoreEntry.propTypes = {
  chore: PropTypes.object.isRequired,
};

export default FutureChoreEntry;
