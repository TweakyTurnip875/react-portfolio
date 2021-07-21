import React, { Component } from 'react';

import authImg from '../../../static/assets/images/auth/login.jpg';
import LoginComponent from '../auth/login';

export default class Auth extends Component {
	constructor(props) {
		super(props);

		this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
		this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
	}
	handleSuccessfulAuth() {
		this.props.handleSuccessfulLogin();
		this.props.history.push('/');
	}
	handleUnsuccessfulAuth() {
		this.props.handleUnsuccessfulLogin();
	}
	render() {
		return (
			<div className="auth-page-wrapper">
				<div
					className="left-column"
					style={{
						backgroundImage: `url(${authImg})`,
					}}
				/>
				<div className="right-column">
					<LoginComponent
						handleSuccessfulAuth={this.handleSuccessfulAuth}
						handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
					/>
				</div>
			</div>
		);
	}
}
