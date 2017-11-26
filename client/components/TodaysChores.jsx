import React from 'react';
import TodaysChoreEntry from './TodaysChoreEntry.jsx';
import TodaysChoreEdit from './TodaysChoreEdit.jsx';

function TodaysChores(props) {
  return (
    <div className="container todays-chores-list">
      <div className="row">
        <h3>Today</h3>
      </div>
      <div className="chores-list">
        {props.chores.map((chore, index) => {
          if (index === props.editComponent) {
            return (
              <TodaysChoreEdit
                chore={chore}
                key={index}
                index={index}
                submitChore={props.submitChore}
                deleteChore={props.deleteChore}
              />
            );
          }
          return (
            <TodaysChoreEntry
              chore={chore}
              key={index}
              index={index}
              handleCompletion={props.handleCompletion}
              editChore={props.editChore}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TodaysChores;
