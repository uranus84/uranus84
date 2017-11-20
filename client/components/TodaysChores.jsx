import React from 'react';
import PropTypes from 'prop-types';
import TodaysChoreEntry from './TodaysChoreEntry.jsx';

function TodaysChores(props) {
  return (
    <div className="todays-chores-list">
      <h3>Todays Chores</h3>
      {props.chores.map((chore, index) => <TodaysChoreEntry chore={chore} key={index} />)}
    </div>
  );
}

TodaysChores.propTypes = {
  chores: PropTypes.array.isRequired,
};

export default TodaysChores;
