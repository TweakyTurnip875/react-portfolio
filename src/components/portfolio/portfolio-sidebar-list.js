import React from "react";

const PortfolioSidebarList = (props) => {
	const portfolioItemsList = props.portfolioItems.map((items) => {
		return (
			<div key={items.id} className="portfolio-sidebar-prev">
				<div className="portfolio-sidebar-thumb-img">
					<img src={items.thumb_image_url}></img>
				</div>
				<h1 className="title">{items.name}</h1>
				<h2>{items.id}</h2>
			</div>
		);
	});
	return <div className="portfolio-sidebar-items-wrapper">{portfolioItemsList}</div>;
};

export default PortfolioSidebarList;
