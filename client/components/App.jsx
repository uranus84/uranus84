import React from 'react';
import axios from 'axios';
import moment from 'moment';

import TodaysChores from './TodaysChores.jsx';
import FutureChores from './FutureChores.jsx';
import AddChore from './AddChore.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user_id,
      username: this.props.username,
      todaysChores: [],
      futureChores: [],
      todayEditIndex: null,
      futureEditIndex: null,
    };
    this.fetchChores = this.fetchChores.bind(this);
    this.handleLogout = this.props.handleLogout.bind(this);
    this.addChore = this.addChore.bind(this);
    this.handleCompletion = this.handleCompletion.bind(this);
    this.deleteChore = this.deleteChore.bind(this);
    this.submitChoreEdits = this.submitChoreEdits.bind(this);
    this.editTodayChore = this.editTodayChore.bind(this);
    this.editFutureChore = this.editFutureChore.bind(this);
  }

  componentDidMount() {
    this.fetchChores();
  }

  fetchChores() {
    const app = this;
    axios.get('/chores')
      .then((response) => {
        app.setState({
          todaysChores: response.data.todayChores,
          futureChores: response.data.futureChores,
        });
      })
      .catch(err => console.log(err));
  }

  addChore(chore) {
    axios.post('/chores', chore)
      .then(() => {
        this.fetchChores();
      })
      .catch(err => console.log(err));
  }

  handleCompletion(choreType, index) {
    const chores = this.state[choreType];
    chores[index].completed = '1';
    chores[index].last_date_completed = moment().format('YYYY-MM-DD');
    this.setState({ [choreType]: chores });

    axios.put('/chores', { id: chores[index].id })
      .then(() => {
        console.log('completed a chore');
      })
      .catch(err => console.log(err));
  }

  deleteChore(index, choreType) {
    this.setState({ [`${choreType}EditIndex`]: null });

    axios.delete('/chores', { data: { id: index } })
      .then(() => {
        this.fetchChores();
      })
      .catch(err => console.log(err));
  }

  submitChoreEdits(index, obj, choreType) {
    this.setState({ [`${choreType}EditIndex`]: null });

    axios.put('/editChore', obj)
      .then(() => {
        this.fetchChores();
      })
      .catch(err => console.log(err));
  }

  editTodayChore(index) {
    this.setState({ todayEditIndex: index });
  }

  editFutureChore(index) {
    this.setState({ futureEditIndex: index });
  }

  userLogout() {
    axios.get('/logout')
      .then((response) => {
        if (response.data.view === 'login') {
          this.handleLogout(response.data.view);
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="welcome">
          <h4>Hi, {this.state.username}!</h4>
          <button className="logout-button" onClick={() => { this.userLogout(); }}>
            Logout
          </button>
        </div>
        <h1>TidyUp!</h1>
        <AddChore addChore={this.addChore} user_id={this.state.user_id} />
        <TodaysChores
          chores={this.state.todaysChores}
          handleCompletion={this.handleCompletion}
          editChore={this.editTodayChore}
          deleteChore={this.deleteChore}
          submitChore={this.submitChoreEdits}
          editComponent={this.state.todayEditIndex}
        />
        <FutureChores
          chores={this.state.futureChores}
          handleCompletion={this.handleCompletion}
          editChore={this.editFutureChore}
          deleteChore={this.deleteChore}
          submitChore={this.submitChoreEdits}
          editComponent={this.state.futureEditIndex}
        />
      </div>
    );
  }
}

export default App;
