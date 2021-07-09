import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BlogItem from "../blog/blog-item";
import BlogModal from "../modals/blog-modal";

class Blog extends Component {
	constructor() {
		super();

		this.state = {
			blogItems: [],
			currentPage: 0,
			totalCount: 0,
			isLoading: true,
			blogModalOpen: false
		};

		this.getBlogItems = this.getBlogItems.bind(this);
		this.onScroll = this.onScroll.bind(this);
		this.handleNewBlogClick = this.handleNewBlogClick.bind(this)
		this.handleModalClose = this.handleModalClose.bind(this)

		window.addEventListener("scroll", this.onScroll, false)
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
	handleNewBlogClick() {
		this.setState({
			blogModalOpen: true
		})
	}

	handleModalClose() {
		this.setState({
			blogModalOpen: false
		})
	}

	componentWillMount() {
		this.getBlogItems();
	}
	componentWillUnmount() {
		window.removeEventListener("scroll", this.onScroll, false)
	}
	render() {
		const blogRecords = this.state.blogItems.map((blogItem) => {
			return <BlogItem key={blogItem.id} blogItem={blogItem} />;
		});
		return (
			<div className="blog-detail-container">
				<div>
					<a onClick={this.handleNewBlogClick}>Open Modal</a>
				</div>
				<BlogModal blogModalOpen={this.state.blogModalOpen} handleModalClose={this.handleModalClose} />
				{this.state.isLoading ? (
					<div className="content-loader">
						<FontAwesomeIcon icon="spinner" pulse />
					</div>
				) : (
					<div className="blog-detail-wrapper">
						{blogRecords}
					</div>
				)}
			</div>
		);
	}
}

export default Blog;
