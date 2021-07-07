import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
          blogItems: res.data.portfolio_blogs
        })
      })
      .catch(error => {
        console.log(error)
      })
	}

  componentWillMount() {
    this.getBlogItems()
  }
	render() {
		return (
			<div>
				<h2>blog</h2>
				<div>
					<Link to="/about">Read More</Link>
				</div>
			</div>
		);
	}
}

export default Blog;
