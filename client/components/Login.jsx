import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log('inside constructor');
    this.state = {
			username: '',
			password: ''
    }
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.submitLoginCredentials = this.submitLoginCredentials.bind(this);
    this.signupNewUser = this.signupNewUser.bind(this);
  }

  onChangeUsername(event){
		console.log(event.target.value);
		this.setState({username: event.target.value});
  }

  onChangePassword(event){
		this.setState({password: event.target.value});
  }

  submitLoginCredentials() {
		axios.post('/login', {
			username: this.state.username,
			password: this.state.password
		})
		.then((response) => {
			if (response.data.view === 'home') {
				this.props.handleLogin(response.data.view);
			}
		})
		.catch(function (error) {
			alert('Please check your username and password input.');
		});
	}

  signupNewUser(){
		// console.log('Clicked signup!');
		this.props.handleLogin('signup')
	}

	render (){
		return (
			<div>
				<form action="javascript:void(0)" onSubmit={this.submitLoginCredentials}>
					<div>
						<input ref='username' type='text' id='username' onChange={this.onChangeUsername}></input>
					</div>
					<div>
						<input ref='password' type='text' id='password' onChange={this.onChangePassword}></input>
					</div>
					<input type='submit' className='login' value='Login' />
				</form>
				<button type='button' className='signup' onClick={() => {this.signupNewUser()}}>
					Sign up
				</button>
			</div>
		);
	}
};

export default Login;