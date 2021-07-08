import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import BlogItem from "../blog/blog-item";

class Blog extends Component {
	constructor() {
		super();

		this.state = {
			blogItems: [],
		};

		this.getBlogItems = this.getBlogItems.bind(this);
	}

	getBlogItems() {
		axios
			.get("https://tweakyturnip875.devcamp.space/portfolio/portfolio_blogs", {
				withCredentials: true,
			})
			.then((res) => {
				this.setState({
					blogItems: res.data.portfolio_blogs,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	componentWillMount() {
		this.getBlogItems();
	}
	render() {
		const blogRecords = this.state.blogItems.map((blogItem) => {
			return <BlogItem key={blogItem.id} blogItem={blogItem} />
		});
		return (
			<div className="blog-detail-container">
				<div className="blog-records">
					<div className="blog-detail-wrapper">
						{blogRecords}
					</div>
				</div>
			</div>
		)
	}
}

export default Blog;
