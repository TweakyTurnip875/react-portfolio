import React, { Component } from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BlogFeaturedImage from './blog-featured-image';
import BlogForm from './blog-form';

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
	}

	handleEditClick() {
		console.log('handle edit click');

		this.setState({
			editMode: true,
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

	componentDidMount() {
		this.getBlogItems();
	}
	render() {
		const { title, content, featured_image_url, blog_status } =
			this.state.currentBlog;
		const contentManager = () => {
			if (this.state.editMode) {
				return <BlogForm />;
			} else {
				return (
					<div className="blog-detail-container">
						<div className="blog-detail-wrapper">
							<div className="post-title-content">
								<h1>{title}</h1>
								<div className="status">({blog_status})</div>
							</div>
							<BlogFeaturedImage img={featured_image_url} />

							<div className="content">{ReactHtmlParser(content)}</div>
							<div>
								<a onClick={this.handleEditClick}>
									<FontAwesomeIcon icon="edit" />
								</a>
							</div>
						</div>
					</div>
				);
			}
		};
		return <div className="blog-container">{contentManager()}</div>;
	}
}
