import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSignOutAlt, faEdit, faTrashAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import PortfolioDetail from "./portfolio/portfolio-detail";
import NoMatch from "./pages/no-match";
import Auth from "./pages/auth";
import PortfolioManager from "./pages/portfolio-manager";
import BlogDetail from "./blog/blog-detail";


library.add(faTrash, faSignOutAlt, faEdit, faTrashAlt, faTimes)

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loginStatus: "NOT_LOGGED_IN",
		};
		this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
		this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
		this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
	}

	handleSuccessfulLogin() {
		this.setState({
			loginStatus: "LOGGED_IN",
		});
	}
	handleUnsuccessfulLogin() {
		this.setState({
			loginStatus: "NOT_LOGGED_IN",
		});
	}

	handleSuccessfulLogout() {
		this.setState({
			loginStatus: "NOT_LOGGED_IN",
		});
	}

	// checks to see weather or not the user is logged in.
	checkLoginStatus() {
		return axios
			.get("https://api.devcamp.space/logged_in", {
				withCredentials: true,
			})
			.then((response) => {
				const loggedIn = response.data.logged_in;
				const loginStatus = this.state.loginStatus;

				// If loggedIn and status LOGGED_IN => return data
				// If loggedIn status NOT_LOGGED_IN => update state
				// If not loggedIn and status LOGGED_IN => update state

				if (loggedIn && loginStatus === "LOGGED_IN") {
					return loggedIn;
				} else if (loggedIn && loginStatus === "NOT_LOGGED_IN") {
					this.setState({
						loginStatus: "LOGGED_IN",
					});
				} else if (!loggedIn && loginStatus === "LOGGED_IN") {
					this.setState({
						loginStatus: "NOT_LOGGED_IN",
					});
				}
			})
			.catch((error) => {
				console.log("Error", error);
			});
	}
	authorizedRoutes() {
		return [
			<Route
				key="portfolio-manager"
				path="/portfolio-manager"
				component={PortfolioManager}
			/>,
		];
	}
	componentDidMount() {
		this.checkLoginStatus();
	}

	render() {
		return (
			<div className="container">
				<Router>
					<NavigationContainer
						loginStatus={this.state.loginStatus}
						handleSuccessfulLogout={this.handleSuccessfulLogout}
					/>
					<div>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route
								path="/auth"
								render={(props) => (
									<Auth
										{...props}
										handleSuccessfulLogin={this.handleSuccessfulLogin}
										handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
									/>
								)}
							/>
							<Route path="/about" component={About} />
							<Route path="/contact" component={Contact} />
							<Route path="/blog" component={Blog} />
							<Route path="/b/:slug" component={BlogDetail} />

							{this.state.loginStatus === "LOGGED_IN"
								? this.authorizedRoutes()
								: null}
							<Route
								exact
								path="/portfolio/:slug"
								component={PortfolioDetail}
							/>
							<Route component={NoMatch} />
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}
