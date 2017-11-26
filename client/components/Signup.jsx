import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.signupNewUser = this.signupNewUser.bind(this);
  }

  onChangeUsername(event) {
    // console.log(event.target.value);
    this.setState({ username: event.target.value });
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  returnToLogin() {
    // console.log('Clicked signup!');
    this.props.handleSignup({ view: 'login' });
  }

  signupNewUser() {
    // console.log('Clicked signup!');
    axios.post('/signup', {
      username: this.state.username,
      password: this.state.password,
    })
      .then((response) => {
        console.log(response);
        if (response.data.view === 'home') {
          this.props.handleSignup(response.data.view);
        }
      })
      .catch((error) => {
        console.log(error);
        alert('The username is already taken.');
        // alert('The username is already taken.');
      });
  }

  render() {
    return (
      <div className="login">
        <h1>TidyUp</h1>
        <h3>Create an Account</h3>
        <div className="login-container">
          <form action="javascript:void(0)" onSubmit={this.signupNewUser}>
            <div>
              <input
                placeholder="username"
                type="text"
                id="username"
                onChange={this.onChangeUsername}
              />
            </div>
            <div>
              <input
                placeholder="password"
                type="password"
                id="password"
                onChange={this.onChangePassword}
              />
            </div>
            <input type="submit" className="signup-button" value="Sign up" />
          </form>
          <button type="button" className="login-button" onClick={() => { this.returnToLogin(); }}>
            Return to Login
          </button>
        </div>
      </div>
    );
  }
}

export default Signup;
