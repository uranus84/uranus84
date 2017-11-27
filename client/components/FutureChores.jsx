import React from 'react';
import FutureChoreEntry from './FutureChoreEntry.jsx';
import ChoreEdit from './ChoreEdit.jsx';

function FutureChores(props) {
  return (
    <div className="future-chores-list">
      <h3>Tomorrow and Beyond</h3>
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
            <FutureChoreEntry
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

export default FutureChores;
