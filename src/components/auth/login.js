import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class LoginComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			errorText: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
			errorText: '',
		});
	}
	handleSubmit(event) {
		axios
			.post(
				'https://api.devcamp.space/sessions',
				{
					client: {
						email: this.state.email,
						password: this.state.password,
					},
				},
				{ withCredentials: true }
			)
			.then((res) => {
				if (res.data.status === 'created') {
					this.props.handleSuccessfulAuth();
				} else {
					this.setState({
						errorText: 'Wrong email or password.',
					});
					this.props.handleUnsuccessfulAuth();
				}
			})
			.catch((error) => {
				this.setState({
					errorText: `An error occurred: ${error}`,
				});
				this.props.handleUnsuccessfulAuth();
			});
		event.preventDefault();
	}
	render() {
		return (
			<div className="login-component-wrapper">
				<h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>
				<div>{this.state.errorText}</div>
				<form onSubmit={this.handleSubmit} className="login-form-wrapper">
					<div className="form-item-wrapper">
						<FontAwesomeIcon icon="envelope" />
						<input
							type="email"
							name="email"
							placeholder="Your Email"
							value={this.state.email}
							onChange={this.handleChange}
						/>
					</div>
					<div className="form-item-wrapper">
						<FontAwesomeIcon icon="unlock-alt" />
						<input
							type="password"
							name="password"
							placeholder="Your Password"
							value={this.state.password}
							onChange={this.handleChange}
							style={{ marginBottom: '0px' }}
						/>
					</div>

					<button className="btn" type="submit">
						Login
					</button>
				</form>
			</div>
		);
	}
}
