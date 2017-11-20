import React from 'react';
import $ from 'jquery';

class Login extends React.component {
  constructor() {
		super();
		this.state = {
			username: '',
			password: ''
		}
	}

	render (){
		return (
			<div id='login'>
				<input type='text' id='username'></input>
				<input type='text' id='password'></input>
				<button type='button' /*onClick={() => {some function}}*/>
					Login
				</button>
				<button type='button' /*onClick={() => {some other function}}}*/>
					Sign-up
				</button>
			</div>
		);
	}
}