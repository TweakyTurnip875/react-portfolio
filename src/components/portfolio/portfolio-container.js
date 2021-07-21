import React, { Component } from 'react';
import axios from 'axios';

import PortfolioItem from './portfolio-item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class PortfolioContainer extends Component {
	constructor() {
		super();

		this.state = {
			pageTitle: 'Welcome to my portfolio.',
			isLoading: true,
			data: [], // data from api gets stored in here.
		};
		this.handleFilter = this.handleFilter.bind(this);
	}
	// filters through the data array in state on button press.
	handleFilter(filter) {
		if (filter === 'CLEAR_FILTER') {
			this.getData();
		} else {
			this.getData(filter);
		}
	}
	// gets data from api.
	getData(filter = null) {
		axios
			.get('https://tweakyturnip875.devcamp.space/portfolio/portfolio_items')
			.then((res) => {
				if (filter) {
					this.setState({
						data: res.data.portfolio_items.filter((item) => {
							return item.category === filter;
						}),
					});
				} else {
					this.setState({
						data: res.data.portfolio_items,
						isLoading: false,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
	portfolioItems() {
		return this.state.data.map((item) => {
			return <PortfolioItem key={item.id} item={item} />;
		});
	}
	componentDidMount() {
		this.getData();
	}
	render() {
		if (this.state.isLoading) {
			return (
				<div className="page-loader">
					<div className="content-loader">
						<FontAwesomeIcon icon="spinner" pulse />
					</div>
				</div>
			);
		}

		return (
			<div className="filter-container">
				<div className="filter-wrapper">
					<button
						className="btn"
						onClick={() => this.handleFilter('Entertainment')}
					>
						Entertainment
					</button>
					<button
						className="btn"
						onClick={() => this.handleFilter('Scheduling')}
					>
						Scheduling
					</button>
					<button className="btn" onClick={() => this.handleFilter('Learning')}>
						Learning
					</button>
					<button
						className="btn"
						onClick={() => this.handleFilter('CLEAR_FILTER')}
					>
						All
					</button>
				</div>
				<div className="portfolio-items-wrapper">{this.portfolioItems()}</div>
			</div>
		);
	}
}
