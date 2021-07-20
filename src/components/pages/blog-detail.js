import React, { Component } from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BlogFeaturedImage from '../blog/blog-featured-image';
import BlogForm from '../blog/blog-form';

export default class BlogItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentId: props.match.params.slug,
			currentBlog: {},
			editMode: false,
		};
		this.getBlogItems = this.getBlogItems.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleFeaturedImageDelete = this.handleFeaturedImageDelete.bind(this);
		this.handleSuccessfulEditFormSubmission =
			this.handleSuccessfulEditFormSubmission.bind(this);
	}

	handleEditClick() {
		if (this.props.loginStatus === 'LOGGED_IN') {
			console.log('handle edit click');

			this.setState({
				editMode: true,
			});
		}
	}
	handleSuccessfulEditFormSubmission(blog) {
		this.setState({
			currentBlog: blog,
			editMode: false,
		});
	}

	getBlogItems() {
		axios
			.get(
				`https://tweakyturnip875.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`
			)
			.then((res) => {
				this.setState({
					currentBlog: res.data.portfolio_blog,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}
	handleFeaturedImageDelete() {
		this.setState({
			currentBlog: {
				featured_image_url: '',
			},
		});
	}
	componentDidMount() {
		this.getBlogItems();
	}
	render() {
		const { title, content, featured_image_url, blog_status } =
			this.state.currentBlog;
		const contentManager = () => {
			if (this.state.editMode) {
				return (
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr 1fr' }}>
						<div style={{ gridColumn: '2' }}>
							<BlogForm
								handleFeaturedImageDelete={this.handleFeaturedImageDelete}
								handleSuccessfulEditFormSubmission={
									this.handleSuccessfulEditFormSubmission
								}
								editMode={this.state.editMode}
								blog={this.state.currentBlog}
							/>
						</div>
					</div>
				);
			} else {
				return (
					<div className="blog-detail-container">
						<div className="blog-detail-wrapper">
							<div className="post-title-content">
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<div className="blog-post-title-wrapper">
										<h1>{title}</h1>
									</div>
									<div className="blog-edit-click">
										<a onClick={this.handleEditClick}>
											<FontAwesomeIcon icon="edit" />
										</a>
									</div>
								</div>
								<div className="status">({blog_status})</div>
							</div>
							<BlogFeaturedImage img={featured_image_url} />

							<div className="content">{ReactHtmlParser(content)}</div>
						</div>
					</div>
				);
			}
		};
		return <div className="blog-container">{contentManager()}</div>;
	}
}
