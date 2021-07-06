import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PortfolioSidebarList = (props) => {
	const portfolioItemsList = props.portfolioItems.map((items) => {
		return (
			<div key={items.id} className="portfolio-sidebar-prev">
				<div className="portfolio-sidebar-thumb-img">
					<img src={items.thumb_image_url}></img>
				</div>
				<div className="title-icon-wrapper">
					<div className="title">{items.name}</div>
					<div className="actions">
						<a
							className="action-icon"
							onClick={() => props.handleEditClick(items)}
						>
							<FontAwesomeIcon icon="edit" />
						</a>
						<a
							className="action-icon"
							onClick={() => props.handleDeleteClick(items)}
						>
							<FontAwesomeIcon icon="trash" />
						</a>
					</div>
				</div>
			</div>
		);
	});
	return (
		<div className="portfolio-sidebar-items-wrapper">{portfolioItemsList}</div>
	);
};

export default PortfolioSidebarList;
