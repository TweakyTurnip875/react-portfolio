import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export default function (props) {
	return (
		<div className="no-match">
      <p>{props.isLoading}</p>
			<div>
				<h1>It looks like the page you are looking for doesn't exist!</h1>
				<div className="error-display-wrapper">
					<div className="one-column">
						<div className="error">404</div>
					</div>
				</div>
				<div className="return">
					<Link to="/">
            ... back to home
          </Link>
				</div>
			</div>
		</div>
	);
}
