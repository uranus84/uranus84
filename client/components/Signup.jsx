import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			username: '',
			password: ''
    }
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.signupNewUser = this.signupNewUser.bind(this);
  }

  onChangeUsername(event){
		// console.log(event.target.value);
		this.setState({username: event.target.value});
  }

  onChangePassword(event){
		this.setState({password: event.target.value});
  }

  signupNewUser() {
		// console.log('Clicked signup!');
		return axios.post('/signup', {
			username: this.state.username,
			password: this.state.password
		})
		.then(function (response) {
			console.log('Successfully signed up!');
		})
		.catch(function (error) {
			console.log(error);
		});
  }

	render (){
		return (
			<div>
				<form action="javascript:void(0)" onSubmit={this.signupNewUser}>
					<div>
						<input ref='username' type='text' id='username' onChange={this.onChangeUsername}></input>
					</div>
					<div>
						<input ref='password' type='text' id='password' onChange={this.onChangePassword}></input>
					</div>
					<input type='submit' className='signup'></input>
				</form>
			</div>
		);
	}
};

export default Signup;