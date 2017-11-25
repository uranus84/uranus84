import React from 'react';
// import Axios for all client files making requests
import axios from 'axios';

import TodaysChores from './TodaysChores.jsx';
import FutureChores from './FutureChores.jsx';
import AddChore from './AddChore.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // user_id: 1,
      username: 'amy',
      todaysChores: [
        {
          id: 1,
          chore_name: 'Wash dishes',
          next_date: '2017-11-19',
          frequency: 'daily',
          last_date_completed: '2017-11-18',
          completed: true,
        },
        {
          id: 2,
          chore_name: 'do laundry',
          next_date: '2017-11-19',
          frequency: 'weekly',
          last_date_completed: '2017-11-18',
          completed: false,
        },
        {
          id: 3,
          chore_name: 'Vacuum',
          next_date: '2017-11-19',
          frequency: 'weekly',
          last_date_completed: '2017-11-18',
          completed: false,
        },
      ],
      futureChores: [
        {
          id: 4,
          chore_name: 'take out trash',
          next_date: '2017-12-19',
          frequency: 'daily',
          last_date_completed: '2017-11-18',
          completed: false,
        },
        {
          id: 5,
          chore_name: 'change sheets',
          next_date: '2017-12-19',
          frequency: 'weekly',
          last_date_completed: '2017-11-18',
          completed: false,
        },
        {
          id: 6,
          chore_name: 'clean toilet',
          next_date: '2017-12-19',
          frequency: 'daily',
          last_date_completed: '2017-11-18',
          completed: false,
        },
      ],
    };
    this.handleCompletionToday = this.handleCompletionToday.bind(this);
    this.handleCompletionFuture = this.handleCompletionFuture.bind(this);
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
    chores[index].completed = true;
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
    chores[index].completed = true;
    this.setState({ futureChores: chores });

    axios.put('/chores', { id: chores[index].id })
      .then((response) => {
        console.log('completed a chore');
        console.log(response);
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
          <AddChore />
        </div>
        <div className="row">
          <TodaysChores
            chores={this.state.todaysChores}
            handleCompletion={this.handleCompletionToday}
          />
        </div>
        <div className="row">
          <FutureChores
            chores={this.state.futureChores}
            handleCompletion={this.handleCompletionFuture}
          />
        </div>
      </div>
    );
  }
}

export default App;
