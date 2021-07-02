import React from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

import PortfolioManager from "../pages/portfolio-manager";

const NavigationContainer = (props) => {
	const dynamicLink = (route, text) => {
		return (
			<div className="nav-link">
				<NavLink to={route} activeClassName="nav-link-active">
					{text}
				</NavLink>
			</div>
		);
	};
	const handleSignOut = () => {
		axios
			.delete("https://api.devcamp.space/logout", { withCredentials: true })
			.then((res) => {
				if (res.status === 200) {
					props.history.push("/");
					props.handleSuccessfulLogout();
				}
				return res.data;
			})
			.catch((error) => {
				console.log("Error signing out", error);
			});
	};

	return (
		<div className="nav-wrapper">
			<div className="left-side">
				<div className="nav-link">
					<NavLink exact to="/" activeClassName="nav-link-active">
						Home
					</NavLink>
				</div>
				<div className="nav-link">
					<NavLink to="/about" activeClassName="nav-link-active">
						About
					</NavLink>
				</div>
				<div className="nav-link">
					<NavLink to="/contact" activeClassName="nav-link-active">
						Contact
					</NavLink>
				</div>
				<div className="nav-link">
					<NavLink to="/blog" activeClassName="nav-link-active">
						Blog
					</NavLink>
				</div>
				{props.loginStatus === "LOGGED_IN"
					? dynamicLink("/portfolio-manager", "Portfolio Manager")
					: null}
			</div>
			<div className="right-side">
				TWEAKYTURNIP875
				{props.loginStatus === "LOGGED_IN" ? (
					<a onClick={handleSignOut}>sign out</a>
				) : null}
			</div>
		</div>
	);
};

export default withRouter(NavigationContainer);
