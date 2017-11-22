import React from 'react';

function AddChore() {
  // should have a "custom" frequency picker as well
  return (
    <div className="row add-chore">
      <form id="add-chore-form">
        <input className="chore-name" type="text" />
        <input id="datepicker" type="text" />
        <input id="timepicker" type="text" />
        <select name="frequency">
          <option value="Daily">Daily</option>
          <option value="Daily">Weekly</option>
          <option value="Daily">Bi-Weekly</option>
          <option value="Daily">Monthly</option>
          <option value="Daily">Semi-Annually</option>
          <option value="Daily">Annually</option>
        </select>
        <button type="submit">Add Chore</button>
      </form>
    </div>
  );
}

export default AddChore;
