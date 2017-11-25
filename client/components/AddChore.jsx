import React from 'react';
import axios from 'axios';
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
    axios.post('/chores', {
      chore_name: this.state.chore_name,
      next_date: this.state.next_date,
      frequency: this.state.frequency,
      user_id: 1,
    })
      .then((response) => {
        console.log('posted a chore to server!');
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="row add-chore">
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
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button type="submit">Add Chore</button>
        </form>
      </div>
    );
  }
}

export default AddChore;

