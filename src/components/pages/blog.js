import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BlogItem from "../blog/blog-item";

class Blog extends Component {
	constructor() {
		super();

		this.state = {
			blogItems: [],
			currentPage: 0,
			totalCount: 0,
			isLoading: true,
			allPostsLoaded: "all posts have been loaded."
		};

		this.getBlogItems = this.getBlogItems.bind(this);
		this.onScroll = this.onScroll.bind(this);
	}

	onScroll() {
			if(this.state.isLoading || this.state.blogItems.length === this.state.totalCount) {
				return;
			}
			if (
				window.innerHeight + document.documentElement.scrollTop ===
				document.documentElement.offsetHeight
			) {
				this.getBlogItems()
			}
	}

	getBlogItems() {
		this.setState({
			currentPage: this.state.currentPage + 1,
		});
		axios
			.get(`https://tweakyturnip875.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`, {
				withCredentials: true,
			})
			.then((res) => {
				console.log("getting more posts:", res.data)
				this.setState({
					blogItems: this.state.blogItems.concat(res.data.portfolio_blogs),
					totalCount: res.data.meta.total_records,
					isLoading: false,
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
			return <BlogItem key={blogItem.id} blogItem={blogItem} />;
		});
		return (
			<div className="blog-detail-container">
				{this.state.isLoading ? (
					<div className="content-loader">
						<FontAwesomeIcon icon="spinner" pulse />
					</div>
				) : (
					<div className="blog-detail-wrapper">{blogRecords}</div>
				)}
			</div>
		);
	}
}

export default Blog;
