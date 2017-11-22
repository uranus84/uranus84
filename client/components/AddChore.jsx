import React from 'react';
import Datetime from 'react-datetime';
import axios from 'axios';
import moment from 'moment';

class AddChore extends React.component {
  // future implementation should have a "custom" frequency picker as well
  constructor(props) {
    super(props);
    this.state = {
      chore_name: '',
      next_date: '',
      frequency: '',
    };
  }

  handleDateChange(event) {
    this.setState({ next_date: moment(event._d).format('YYYY-MM-DD hh:mm:ss') });
  }
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }
  handleSubmit() {
    axios.post('/chores', {
      chore_name: this.state.chore_name,
      next_date: this.state.next_date,
      frequency: this.state.frequency,
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
        <form id="add-chore-form" onSubmit={this.handleSubmit}>
          Chore:
          <input id="chore_name" type="text" onChange={e => this.handleChange(e)} />
          Date:
          <Datetime id="next_date" onChange={e => this.handleDateChange(e)} />
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
