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
    this.handleCompletionToday = this.handleCompletionToday.bind(this);
    this.handleCompletionFuture = this.handleCompletionFuture.bind(this);
    this.editTodayChore = this.editTodayChore.bind(this);
    this.submitEditsTodayChore = this.submitEditsTodayChore.bind(this);
    this.editFutureChore = this.editFutureChore.bind(this);
    this.submitEditsFutureChore = this.submitEditsFutureChore.bind(this);
    this.handleLogout = this.props.handleLogout.bind(this);
  }

  componentDidMount() {
    this.fetchChores.call(this);
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

  handleCompletionToday(index) {
    const chores = this.state.todaysChores;
    chores[index].completed = '1';
    chores[index].last_date_completed = moment().format('YYYY-MM-DD');
    this.setState({ todaysChores: chores });

    axios.put('/chores', { id: chores[index].id })
      .then((response) => {
        console.log('completed a chore');
        console.log(response);
      })
      .catch(err => console.log(err));
  }

  handleCompletionFuture(index) {
    const chores = this.state.futureChores;
    chores[index].completed = '1';
    chores[index].last_date_completed = moment().format('YYYY-MM-DD');
    this.setState({ futureChores: chores });

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

  submitEditsTodayChore(index, obj) {
    const chores = this.state.todaysChores;
    chores[index] = obj;
    this.setState({ todaysChores: chores });
    this.setState({ todayEditIndex: null });

    ///////////*Uncomment this when TJ database route is up*///////////////
    // axios.put('/editChore', { task: chores[index] })
    //   .then((response) => {
    //     console.log('Chore updated');
    //     console.log(response);
    //   })
    //   .catch(err => console.log(err));
  }

  editFutureChore(index) {
    this.setState({ futureEditIndex: index });
  }

  submitEditsFutureChore(index, obj) {
    const chores = this.state.futureChores;
    chores[index] = obj;
    this.setState({ futureChores: chores });
    this.setState({ futureEditIndex: null });

    ///////////*Uncomment this when TJ database route is up*///////////////
    // axios.put('/editChore', { task: chores[index] })
    //   .then((response) => {
    //     console.log('Chore updated');
    //     console.log(response);
    //   })
    //   .catch(err => console.log(err));
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
      <div className="container">
        <div className="row">
          <h4>Hi, {this.state.username}!</h4>
        </div>
        <div className="row">
          <h1>Household Management</h1>
        </div>
        <div className="row">
          <AddChore user_id={this.state.user_id} />
        </div>
        <div className="row">
          <TodaysChores
            chores={this.state.todaysChores}
            handleCompletion={this.handleCompletionToday}
            editChore={this.editTodayChore}
            submitChore={this.submitEditsTodayChore}
            editComponent={this.state.todayEditIndex}
          />
        </div>
        <div className="row">
          <FutureChores
            chores={this.state.futureChores}
            handleCompletion={this.handleCompletionFuture}
            editChore={this.editFutureChore}
            submitChore={this.submitEditsFutureChore}
            editComponent={this.state.futureEditIndex}
          />
        </div>
        <div className="button">
          <button type="button" onClick={() => { this.userLogout(); }}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default App;
