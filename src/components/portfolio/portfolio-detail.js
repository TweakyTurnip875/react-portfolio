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
		const {
			logo_url,
			banner_image_url,
			description,
			url,
			name,
			thumb_image_url,
		} = this.state.portfolioItem;
		return (
			<div className="portfolio-details-wrapper">
				<div
					className="background"
					style={{
						background: `url(${thumb_image_url})`,
					}}
				>
					<div className="logo">
						<img src={logo_url} />
					</div>
					<div className="details-wrapper">
						<div className="details">
							<div className="name-desc-wrapper">
								<div className="name-desc">
									<div>
										<h1>{description}</h1>
									</div>

									<a href={url} target="_blank">
										Visit {name}
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
