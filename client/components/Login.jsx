import React from 'react';
// import Axios for all client files making requests
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log('inside constructor');
    this.state = {
			username: '',
			password: ''
    }
  }

  submit() {
    this.setState({username: this.refs.username.value, password: this.refs.password.value});
  }

	render (){
		return (
			<div>
				<form action="javascript:void(0)" onSubmit={() => {this.submit()}}>
					<div>
						<input ref='username' type='text' id='username'></input>
					</div>
					<div>
						<input ref='password' type='text' id='password'></input>
					</div>
					<button type='button' class='login'>
						Login
					</button>
				</form>
				<button type='button' class='signup' /*onClick={() => {some other function}}}*/>
					Sign-up
				</button>
			</div>
		);
	}
}

export default Login;