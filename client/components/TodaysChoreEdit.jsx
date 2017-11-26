import React from 'react';
import moment from 'moment';

class TodayChoreEdit extends React.Component {
  // future implementation should have a "custom" frequency picker as well
  constructor(props) {
    super(props);
    this.state = {
      chore_name: this.props.chore.chore_name,
      next_date: this.props.chore.next_date,
      frequency: this.props.chore.frequency,
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleDateChange(event) {
    this.setState({ next_date: moment(event.target.value).format('YYYY-MM-DD') });
  }

  completedEdits(e) {
    e.preventDefault();
    const editedChoreObj = {
      id: this.props.chore.id,
      chore_name: this.state.chore_name,
      next_date: this.state.next_date,
      frequency: this.state.frequency,
      last_date_completed: this.props.chore.last_date_completed,
      completed: this.props.chore.completed,
    };
    this.props.submitChore(this.props.index, editedChoreObj, 'today');
  }

  render() {
    return (
      <div className="row edit-chore-entry">
        <form
          id="add-chore-form"
          action="javascript:void(0)"
          onSubmit={e => this.completedEdits(e)}
        >
          <input
            id="chore_name"
            type="text"
            value={this.state.chore_name}
            onChange={e => this.handleChange(e)}
          />
          <select
            id="frequency"
            value={this.state.frequency}
            onChange={e => this.handleChange(e)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <input
            id="currentDate"
            type="date"
            value={this.state.next_date}
            onChange={e => this.handleDateChange(e)}
          />
          <button type="submit">Edit Chore</button>
        </form>
      </div>
    );
  }
}

export default TodayChoreEdit;
