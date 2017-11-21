import React from 'react';
import TodaysChoreEntry from './TodaysChoreEntry.jsx';

function TodaysChores(props) {
  return (
    <div className="container todays-chores-list">
      <div className="row">
        <h3>Today</h3>
      </div>
      {props.chores.map((chore, index) => <TodaysChoreEntry chore={chore} key={index} />)}
    </div>
  );
}

export default TodaysChores;
