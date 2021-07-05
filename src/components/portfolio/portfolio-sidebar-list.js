import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PortfolioSidebarList = (props) => {
	const portfolioItemsList = props.portfolioItems.map((items) => {
		return (
			<div key={items.id} className="portfolio-sidebar-prev">
				<div className="portfolio-sidebar-thumb-img">
					<img src={items.thumb_image_url}></img>
				</div>
				<h1 className="title">{items.name}</h1>
				<h2>{items.id}</h2>
				<a onClick={() => props.handleDeleteClick(items)}>
					<FontAwesomeIcon icon="trash" />
				</a>
			</div>
		);
	});
	return <div className="portfolio-sidebar-items-wrapper">{portfolioItemsList}</div>;
};

export default PortfolioSidebarList;
