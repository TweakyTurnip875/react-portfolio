import React, { Component } from "react";
import axios from "axios";

export default class BlogItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentId: props.match.params.slug,
			currentBlog: {},
		};
		this.getBlogItems = this.getBlogItems.bind(this);
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
		return (
			<div className="blog-detail-container">
				<div className="blog-detail-wrapper">
					<div className="post-title-content">
                        <h1>{title}</h1> 
                        <div className="status">({blog_status})</div>
                    </div>
                    {featured_image_url ? (
					    <div className="featured-image-wrapper"><img src={featured_image_url} /></div>
                    ) : (
                        null
                    )}
					<div className="content">{content}</div>

				</div>
			</div>
		);
	}
}
