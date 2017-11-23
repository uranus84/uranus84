import React from 'react';
import TodaysChoreEntry from './TodaysChoreEntry.jsx';

function TodaysChores(props) {
  return (
    <div className="container todays-chores-list">
      <div className="row">
        <h3>Today</h3>
      </div>
      {props.chores.map((chore, index) => {
        return (
          <TodaysChoreEntry
            chore={chore}
            key={index}
            index={index}
            handleCompletion={props.handleCompletion}
          />
        );
      })}
    </div>
  );
}

export default TodaysChores;
