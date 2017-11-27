import React from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class AddChore extends React.Component {
  // future implementation should have a "custom" frequency picker as well
  constructor(props) {
    super(props);
    this.state = {
      chore_name: '',
      next_date: moment().format('YYYY-MM-DD'),
      frequency: 'daily',
    };
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  handleDayChange(day) {
    this.setState({ next_date: moment(day).format('YYYY-MM-DD') });
  }
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const chore = {
      chore_name: this.state.chore_name,
      next_date: this.state.next_date,
      frequency: this.state.frequency,
      user_id: this.props.user_id,
    };
    this.props.addChore(chore);
  }

  render() {
    return (
      <div className="add-chore">
        <form id="add-chore-form" onSubmit={e => this.handleSubmit(e)}>
          Chore:
          <input id="chore_name" type="text" onChange={e => this.handleChange(e)} />
          Date:
          <DayPickerInput
            name="next_date"
            placeholder="MM/DD/YYYY"
            format="MM/DD/YYYY"
            onDayChange={this.handleDayChange}
          />
          Frequency:
          <select id="frequency" onChange={e => this.handleChange(e)}>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Bi-weekly">Bi-Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
          <button className="add-chore-button" type="submit">Add Chore</button>
        </form>
      </div>
    );
  }
}

export default AddChore;

