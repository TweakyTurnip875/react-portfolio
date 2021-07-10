import React, { Component } from "react";

export default class BlogForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			blog_status: "",
		};
		this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
		event.preventDefault();
	}
    handleSubmit(event) {
        console.log(this.state)
        event.preventDefault()
    }
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" onChange={this.handleChange} name="title" placeholder="title" value={this.state.title} />
					<input type="text" onChange={this.handleChange} name="blog_status" placeholder="blog status" value={this.state.blog_status} />
					<button type="submit">submit</button>
				</form>
			</div>
		);
	}
}
