import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

import './style.css';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'login',
      user_id: 0,
      username: '',
    };
    this.changeView = this.changeView.bind(this);
  }
  changeView(option) {
    this.setState({
      view: option.view,
      user_id: option.user_id,
      username: option.username,
    });
  }

  renderView() {
    const { view } = this.state;
    if (view === 'signup') {
      return <Signup handleSignup={this.changeView} />;
    } else if (view === 'home') {
      return (
        <App
          handleLogout={this.changeView}
          user_id={this.state.user_id}
          username={this.state.username}
        />
      );
    }
    return <Login handleLogin={this.changeView} />;
  }

  render() {
    return (
      <div className="main">
        {this.renderView()}
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('app'));
