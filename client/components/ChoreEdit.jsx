import React from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class ChoreEdit extends React.Component {
  // future implementation should have a "custom" frequency picker as well
  constructor(props) {
    super(props);
    this.state = {
      chore_name: this.props.chore.chore_name,
      next_date: this.props.chore.next_date,
      frequency: this.props.chore.frequency,
    };
    this.deleteChore = this.deleteChore.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleDayChange(day) {
    this.setState({ next_date: moment(day).format('YYYY-MM-DD') });
  }

  completedEdits(e) {
    e.preventDefault();
    let choreType = '';
    if (moment(this.state.next_date).isSameOrBefore(this.props.currDate)) {
      choreType = 'today';
    } else {
      choreType = 'future';
    }
    const editedChoreObj = {
      id: this.props.chore.id,
      chore_name: this.state.chore_name,
      next_date: this.state.next_date,
      frequency: this.state.frequency,
      last_date_completed: this.props.chore.last_date_completed,
      completed: this.props.chore.completed,
    };
    this.props.submitChore(this.props.index, editedChoreObj, choreType);
  }

  deleteChore() {
    let choreType = '';
    if (moment(this.state.next_date).isSameOrBefore(this.props.currDate)) {
      choreType = 'today';
    } else {
      choreType = 'future';
    }
    this.props.deleteChore(this.props.chore.id, choreType);
  }

  render() {
    return (
      <div className="row edit-chore-entry">
        <form
          id="edit-chore-form"
          action="javascript:void(0)"
          onSubmit={e => this.completedEdits(e)}
        >
          <input
            className="chore-name"
            id="chore_name"
            type="text"
            value={this.state.chore_name}
            onChange={e => this.handleChange(e)}
          />
          <select
            className="chore-freq"
            id="frequency"
            value={this.state.frequency}
            onChange={e => this.handleChange(e)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <DayPickerInput
            name="next_date"
            placeholder="MM/DD/YYYY"
            format="MM/DD/YYYY"
            onDayChange={e => this.handleDayChange(e)}
          />
          <button className="add-chore-button small-button" type="submit">Edit Chore</button>
          <button
            className="add-chore-button small-button delete-button"
            onClick={() => { this.deleteChore(); }}
          >
            Delete Chore
          </button>
        </form>
      </div>
    );
  }
}

export default ChoreEdit;
