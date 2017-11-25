import React from 'react';
import FutureChoreEntry from './FutureChoreEntry.jsx';
import FutureChoreEdit from './FutureChoreEdit.jsx';

function FutureChores(props) {
  return (
    <div className="container future-chores-list">
      <div className="row">
        <h3>Tomorrow and Beyond</h3>
      </div>
      {props.chores.map((chore, index) => {
        if (index === props.editComponent) {
          return (
            <FutureChoreEdit
              chore={chore}
              key={index}
              index={index}
              submitChore={props.submitChore}
            />
          );
        } else {
          return (
            <FutureChoreEntry
              chore={chore}
              key={index}
              index={index}
              handleCompletion={props.handleCompletion}
              editChore={props.editChore}
            />
          );
        }
      })}
    </div>
  );
}

export default FutureChores;
