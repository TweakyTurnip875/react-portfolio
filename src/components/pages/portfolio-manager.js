import React, { Component } from "react";
import axios from "axios";

import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
		};
		this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this)
		this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this)
	}
	handleSuccessfulFormSubmission(portfolioItem) {
		this.setState({
			data: [portfolioItem].concat(this.state.data)
		})
	}
	handleFormSubmissionError(error) {
		console.log("error submiting form", error)
	}
	getPortfolioItemData() {
		axios
			.get("https://tweakyturnip875.devcamp.space/portfolio/portfolio_items", {
				withCredentials: true,
			})
			.then((res) => {
				this.setState({
					data: [...res.data.portfolio_items]
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}
	componentDidMount() {
		this.getPortfolioItemData();
	}
	render() {
		return (
			<div className="portfolio-manager">
				<div className="left-column">
					<PortfolioForm 
						handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
						handleFormSubmissionError={this.handleFormSubmissionError}
					/>
				</div>
				<div className="right-column">
					<PortfolioSidebarList portfolioItems={this.state.data}/>
				</div>
			</div>
		);
	}
}
