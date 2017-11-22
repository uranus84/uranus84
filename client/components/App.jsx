import React from 'react';
// import Axios for all client files making requests
// import axios from 'axios';

import TodaysChores from './TodaysChores.jsx';
import FutureChores from './FutureChores.jsx';
import AddChore from './AddChore.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('inside constructor');
    this.state = {
      todaysChores: [
        {
          id: 1,
          chore_name: 'Wash dishes',
          next_date: '2017-11-19 09:00:00',
          frequency: 'daily',
          last_date_completed: '2017-11-18 09:00:00',
          completed: true,
        },
        {
          id: 2,
          chore_name: 'do laundry',
          next_date: '2017-11-19 09:00:00',
          frequency: 'weekly',
          last_date_completed: '2017-11-18 09:00:00',
          completed: false,
        },
        {
          id: 3,
          chore_name: 'Vacuum',
          next_date: '2017-11-19 09:00:00',
          frequency: 'weekly',
          last_date_completed: '2017-11-18 09:00:00',
          completed: false,
        },
      ],
      futureChores: [
        {
          id: 4,
          chore_name: 'take out trash',
          next_date: '2017-12-19 09:00:00',
          frequency: 'daily',
          last_date_completed: '2017-11-18 09:00:00',
          completed: false,
        },
        {
          id: 5,
          chore_name: 'change sheets',
          next_date: '2017-12-19 09:00:00',
          frequency: 'weekly',
          last_date_completed: '2017-11-18 09:00:00',
          completed: false,
        },
        {
          id: 6,
          chore_name: 'clean toilet',
          next_date: '2017-12-19 09:00:00',
          frequency: 'daily',
          last_date_completed: '2017-11-18 09:00:00',
          completed: false,
        },
      ],
    };
    // this.testGetReq = this.testGetReq.bind(this);
  }

  // testGetReq() {
  //   axios.get('/test')
  //     .then(function(response) {
  //       console.log(response);
  //     })
  //     .catch(function(err) {
  //       console.log(err);
  //     })
  // }

  render() {
    console.log('rendering');
    // this.testGetReq();
    return (
      <div className="container">
        <div className="row">
          <h1>Household Management</h1>
        </div>
        <div className="row">
          <AddChore />
        </div>
        <div className="row">
          <TodaysChores chores={this.state.todaysChores} />
        </div>
        <div className="row">
          <FutureChores chores={this.state.futureChores} />
        </div>
      </div>
    );
  }
}

export default App;
