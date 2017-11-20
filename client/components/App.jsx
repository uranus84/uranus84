import React from 'react';
// import Axios for all client files making requests
// import axios from 'axios';

import TodaysChores from './TodaysChores.jsx';
import FutureChores from './FutureChores.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('inside constructor');
    this.state = {
      todaysChores: [
        {
          chore_name: 'Wash dishes',
          next_date: Date.now(),
          frequency: 'daily',
          last_date_completed: Date.now(),
          completed: false,
        },
        {
          chore_name: 'do laundry',
          next_date: Date.now(),
          frequency: 'weekly',
          last_date_completed: Date.now(),
          completed: false,
        },
        {
          chore_name: 'Vacuum',
          next_date: Date.now(),
          frequency: 'weekly',
          last_date_completed: Date.now(),
          completed: false,
        },
      ],
      futureChores: [
        {
          chore_name: 'take out trash',
          next_date: Date.now(),
          frequency: 'daily',
          last_date_completed: Date.now(),
          completed: false,
        },
        {
          chore_name: 'change sheets',
          next_date: Date.now(),
          frequency: 'weekly',
          last_date_completed: Date.now(),
          completed: false,
        },
        {
          chore_name: 'clean toilet',
          next_date: Date.now(),
          frequency: 'weekly',
          last_date_completed: Date.now(),
          completed: false,
        },
      ],
    };
    // this.testGetReq = this.testGetReq.bind(this);
  }

  // testGetReq() {
  //   axios.get('/test')
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  render() {
    console.log('rendering');
    // this.testGetReq();
    return (
      <div>
        <TodaysChores chores={this.state.todaysChores} />
        <FutureChores chores={this.state.futureChores} />
      </div>
    );
  }
}

export default App;
