import React from 'react';
// import Axios for all client files making requests
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('inside constructor');
    this.state = {

    }
    this.testGetReq = this.testGetReq.bind(this);
  }

  testGetReq() {
    axios.get('/test')
      .then(function(response) {
        console.log(response);
      })
      .catch(function(err) {
        console.log(err);
      })
  }

  render() {
    console.log('rendering');
    this.testGetReq();
    return (
     <div style={{textAlign: 'center'}}>
        <h1>Hello World</h1>
      </div>);
  }
}

export default App;