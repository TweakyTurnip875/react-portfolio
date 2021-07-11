import axios from "axios";
import React, { Component } from "react";

export default class BlogForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			blog_status: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.buildForm = this.buildForm.bind(this);
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
		event.preventDefault();
	}
	buildForm() {
		let formData = new FormData();

		formData.append("portfolio_blog[title]", this.state.title);
		formData.append("portfolio_blog[blog_status]", this.state.blog_status);

		return formData;
	}
	handleSubmit(event) {
		axios
			.post(
				"https://tweakyturnip875.devcamp.space/portfolio/portfolio_blogs",
				this.buildForm(),
				{ withCredentials: true }
			)
			.then((res) => {
				this.props.handleSuccessfulFormSubmission(res)
			}).catch(error => {
				console.log("error posting blog", error)
			})
		event.preventDefault();
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						onChange={this.handleChange}
						name="title"
						placeholder="title"
						value={this.state.title}
					/>
					<input
						type="text"
						onChange={this.handleChange}
						name="blog_status"
						placeholder="blog status"
						value={this.state.blog_status}
					/>
					<button type="submit">submit</button>
				</form>
			</div>
		);
	}
}
