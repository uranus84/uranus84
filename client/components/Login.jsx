import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.submitLoginCredentials = this.submitLoginCredentials.bind(this);
    this.signupNewUser = this.signupNewUser.bind(this);
  }

  onChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  submitLoginCredentials() {
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password,
    })
      .then((response) => {
        if (response.data.view === 'home') {
          this.props.handleLogin(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Please check your username and password input.');
      });
  }

  signupNewUser() {
    // console.log('Clicked signup!');
    this.props.handleLogin({ view: 'signup' });
  }

  render() {
    return (
      <div className="login">
        <h1>TidyUp</h1>
        <div className="login-container">
          <form action="javascript:void(0)" onSubmit={this.submitLoginCredentials}>
            <div>
              <input
                type="text"
                placeholder="username"
                id="username"
                onChange={this.onChangeUsername}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="password"
                id="password"
                onChange={this.onChangePassword}
              />
            </div>
            <input type="submit" className="login" value="Login" />
          </form>
          <button type="button" className="signup" onClick={() => { this.signupNewUser(); }}>
            Sign up
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
