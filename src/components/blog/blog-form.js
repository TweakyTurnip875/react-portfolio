import axios from 'axios';
import React, { Component } from 'react';

import RichTextEditor from '../forms/rich-text-editor';

export default class BlogForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			blog_status: '',
			content: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.buildForm = this.buildForm.bind(this);
		this.handleRichTextEditorChange =
			this.handleRichTextEditorChange.bind(this);
	}

	buildForm() {
		let formData = new FormData();

		formData.append('portfolio_blog[title]', this.state.title);
		formData.append('portfolio_blog[blog_status]', this.state.blog_status);
		formData.append('portfolio_blog[content]', this.state.content);

		return formData;
	}
	handleRichTextEditorChange(content) {
		this.setState({
			content,
		});
	}
	handleSubmit(event) {
		axios
			.post(
				'https://tweakyturnip875.devcamp.space/portfolio/portfolio_blogs',
				this.buildForm(),
				{ withCredentials: true }
			)
			.then((res) => {
				this.setState({
					title: '',
					blog_status: '',
					content: '',
				});

				this.props.handleSuccessfulFormSubmission(res.data.portfolio_blog);
			})
			.catch((error) => {
				console.log('error posting blog', error);
			});
		event.preventDefault();
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} className="blog-form-wrapper">
				<div className="two-column">
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
				</div>
				<div className="one-column">
					<RichTextEditor
						handleRichTextEditorChange={this.handleRichTextEditorChange}
					/>
				</div>
				<button className="btn" type="submit">
					submit
				</button>
			</form>
		);
	}
}
