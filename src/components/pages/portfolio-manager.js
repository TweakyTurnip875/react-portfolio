import React, { Component } from "react";
import axios from "axios";

import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			editData: {}
		};
		this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
		this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
		this.handleUpdateFormSubmission = this.handleUpdateFormSubmission.bind(this)
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this)
		this.clearEditData = this.clearEditData.bind(this)
	}
	clearEditData() {
		this.setState({
			editData: {}
		})
	}
	handleEditClick(portfolioItem) {
		this.setState({
			editData: portfolioItem
		})
	}
	handleDeleteClick(portfolioItem) {
		axios
			.delete(
				`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`,
				{ withCredentials: true }
			)
			.then((res) => {
				this.setState({
					data: this.state.data.filter(items => {
						return items.id !== portfolioItem.id;
					})
				})
				return res.data;
			})
			.catch((error) => {
				console.log("Error deleting record", error);
			});
	}
	handleUpdateFormSubmission() {
		this.getPortfolioItemData()
	}
	handleNewFormSubmission(portfolioItem) {
		this.setState({
			data: [portfolioItem].concat(this.state.data),
		});
	}
	handleFormSubmissionError(error) {
		console.log("error submiting form", error);
	}

	getPortfolioItemData() {
		axios
			.get("https://tweakyturnip875.devcamp.space/portfolio/portfolio_items", {
				withCredentials: true,
			})
			.then((res) => {
				this.setState({
					data: [...res.data.portfolio_items],
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
						handleNewFormSubmission={this.handleNewFormSubmission}
						handleUpdateFormSubmission={this.handleUpdateFormSubmission}
						handleFormSubmissionError={this.handleFormSubmissionError}
						clearEditData={this.clearEditData}
						editData={this.state.editData}
					/>
				</div>
				<div className="right-column">
					<PortfolioSidebarList
						handleDeleteClick={this.handleDeleteClick}
						handleEditClick={this.handleEditClick}
						portfolioItems={this.state.data}
					/>
				</div>
			</div>
		);
	}
}
