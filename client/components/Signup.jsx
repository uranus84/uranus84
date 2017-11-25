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
      <div>
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
              type="text"
              id="password"
              onChange={this.onChangePassword}
            />
          </div>
          <input type="submit" className="signup" value="Sign up" />
        </form>
      </div>
    );
  }
}

export default Signup;
