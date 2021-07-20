import axios from 'axios';
import React, { Component } from 'react';

export default class PortfolioDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.slug,
			portfolioItem: {},
		};
		this.getPortfolioItem = this.getPortfolioItem.bind(this);
	}
	getPortfolioItem() {
		const { id } = this.state;
		axios
			.get(
				`https://tweakyturnip875.devcamp.space/portfolio/portfolio_items/${id}`
			)
			.then((res) => {
				console.log(res);
				this.setState({
					portfolioItem: res.data.portfolio_item,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}
	componentDidMount() {
		this.getPortfolioItem();
	}
	render() {
		const { logo_url, banner_image_url, description, url, name } =
			this.state.portfolioItem;
		return (
			<div>
				<div
					style={{
						background: `url(${banner_image_url})`,
						backgroundSize: 'cover',
						width: '100vw',
						height: '50vh',
					}}
				>
					<img src={logo_url} />
				</div>
				<h2>{description}</h2>
				<div>
					<a href={url} target="_blank">
						Visit {name}
					</a>
				</div>
			</div>
		);
	}
}
