import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

class Index extends React.component {
	constructor() {
		super();
		this.state = {
			view: 'login'
		}

    this.changeView = this.changeView.bind(this);
	}

  changeView(option) {
    this.setState({
      view: option
    });
  }

  renderView() {
    const {view} = this.state;

    if (view === 'login') {
      return <Login handleLogin={this.changeView}/>
    } else if (view === 'signup') {
      return <Signup handleSignup={this.changeView}/>
    } else if (view === '')
  }
}

ReactDOM.render(<Login />, document.getElementById('app'));
