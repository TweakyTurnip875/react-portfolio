import React, { Component } from "react";
import axios from "axios";

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: "Welcome to my portfolio.",
      isLoading: false,
      data: [], // data from api gets stored in here.
    };
    this.handleFilter = this.handleFilter.bind(this);
  }
  // filters through the data array in state on button press.
  handleFilter(filter) {
    this.setState({
      data: this.state.data.filter((item) => {
        return item.category === filter;
      }),
    });
  }
  // gets data from api.
  getData() {
    axios
      .get("https://tweakyturnip875.devcamp.space/portfolio/portfolio_items")
      .then((res) => {
        // handle success
        this.setState({
          data: res.data.portfolio_items,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }
  // Sets data for the portfolio items.
  portfolioItems() {
    
    // maps through data array in state.
    return this.state.data.map((item) => {
      return (
        <PortfolioItem
          key={item.id}
          item={item}
        />
      );
    });
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    if (this.state.isLoading) {
      return <div>loading...</div>;
    }

    return (
        <div className="portfolio-items-wrapper">
        <button className="btn" onClick={() => this.handleFilter("Entertainment")}>
          Entertainment
        </button>
        <button className="btn" onClick={() => this.handleFilter("Scheduling")}>
          Scheduling
        </button>
        <button className="btn" onClick={() => this.handleFilter("Learning")}>
          Learning
        </button>
        {this.portfolioItems()}

      </div>
    );
  }
}
