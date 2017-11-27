import React from 'react';
import TodaysChoreEntry from './TodaysChoreEntry.jsx';
import ChoreEdit from './ChoreEdit.jsx';

function TodaysChores(props) {
  return (
    <div className="todays-chores-list">
      <h3>Today</h3>
      <div className="chores-list">
        {props.chores.map((chore, index) => {
          if (index === props.editComponent) {
            return (
              <ChoreEdit
                chore={chore}
                key={index}
                index={index}
                submitChore={props.submitChore}
                deleteChore={props.deleteChore}
                currDate={props.currDate}
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
              currDate={props.currDate}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TodaysChores;
