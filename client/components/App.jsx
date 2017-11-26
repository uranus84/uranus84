import React from 'react';
// import Axios for all client files making requests
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
    this.handleCompletion = this.handleCompletion.bind(this);
    this.editTodayChore = this.editTodayChore.bind(this);
    this.submitChoreEdits = this.submitChoreEdits.bind(this);
    this.editFutureChore = this.editFutureChore.bind(this);
    this.handleLogout = this.props.handleLogout.bind(this);
    this.fetchChores = this.fetchChores.bind(this);
    this.addChore = this.addChore.bind(this);
  }

  componentDidMount() {
    this.fetchChores();
  }

  fetchChores() {
    const app = this;
    // add this option to GET: { options: { user_id: this.state.user_id } }
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
    console.log('inside addChore');
    axios.post('/chores', chore)
      .then((response) => {
        console.log('posted a chore to server!');
        console.log(response);
        this.fetchChores();
      })
      .catch((err) => {
        console.log('here is an error inside addChore');
        console.log(err);
      });
  }

  handleCompletion(choreType, index) {
    const chores = this.state[choreType];
    chores[index].completed = '1';
    chores[index].last_date_completed = moment().format('YYYY-MM-DD');
    this.setState({ [choreType]: chores });

    axios.put('/chores', { id: chores[index].id })
      .then((response) => {
        console.log('completed a chore');
        console.log(response);
      })
      .catch(err => console.log(err));
  }

  editTodayChore(index) {
    this.setState({ todayEditIndex: index });
  }

  submitChoreEdits(index, obj, choreType) {
    this.setState({ [`${choreType}EditIndex`]: null });

    // *Uncomment this when TJ database route is up*
    axios.put('/editChore', obj)
      .then((response) => {
        console.log('Chore updated');
        console.log(response);
        this.fetchChores();
      })
      .catch(err => console.log(err));
  }

  editFutureChore(index) {
    this.setState({ futureEditIndex: index });
  }

  // submitEditsFutureChore(index, obj) {
  //   const chores = this.state.futureChores;
  //   chores[index] = obj;
  //   this.setState({ futureEditIndex: null });

  //   // *Uncomment this when TJ database route is up*
  //   axios.put('/editChore', obj)
  //     .then((response) => {
  //       console.log('Chore updated');
  //       console.log(response);
  //       this.fetchChores();
  //     })
  //     .catch(err => console.log(err));
  // }

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
      <div className="container">
        <div className="row welcome">
          <h4>Hi, {this.state.username}!</h4>
          <button className="logout-button" onClick={() => { this.userLogout(); }}>
            Logout
          </button>
        </div>
        <div className="row">
          <h1>Household Management</h1>
        </div>
        <div className="row">
          <AddChore addChore={this.addChore} user_id={this.state.user_id} />
        </div>
        <div className="row">
          <TodaysChores
            chores={this.state.todaysChores}
            handleCompletion={this.handleCompletion}
            editChore={this.editTodayChore}
            submitChore={this.submitChoreEdits}
            editComponent={this.state.todayEditIndex}
          />
        </div>
        <div className="row">
          <FutureChores
            chores={this.state.futureChores}
            handleCompletion={this.handleCompletion}
            editChore={this.editFutureChore}
            submitChore={this.submitChoreEdits}
            editComponent={this.state.futureEditIndex}
          />
        </div>
      </div>
    );
  }
}

export default App;
