import React from 'react';
import PropTypes from 'prop-types';
import FutureChoreEntry from './FutureChoreEntry.jsx';

function FutureChores(props) {
  return (
    <div className="future-chores-list">
      <h3>Future Chores</h3>
      {props.chores.map((chore, index) => <FutureChoreEntry chore={chore} key={index} />)}
    </div>
  );
}

FutureChores.propTypes = {
  chores: PropTypes.array.isRequired,
};

export default FutureChores;
