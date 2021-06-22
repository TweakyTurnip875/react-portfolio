import React, { Component } from "react";

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
    constructor() {
        super()
        
        this.state = {
            pageTitle: "Welcome to my portfolio.",
            isLoading: false,
            data: [
                {title: "eCommerce", category: "eCommerce" }, 
                {title: "Scheduling", category: "Scheduling" }, 
                {title: "Enterprise", category: "Enterprise" }, 
                {title: "eCommerce", category: "eCommerce" }
            ]
        }
        this.handleFilter = this.handleFilter.bind(this)
    }
    handleFilter(filter) {
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter;
            })
        })
    }
    portfolioItems() {
        return this.state.data.map(item => {
            return <PortfolioItem title={item.title} url="google.com" />
        })
    }
    render() {
        if(this.state.isLoading) {
            return <div>loading...</div>
        }
        return(
            <div>
                <h2>{this.state.pageTitle}</h2>
                {this.portfolioItems()}
                <button onClick={() => this.handleFilter("eCommerce")}>eCommerce</button>
                <button onClick={() => this.handleFilter("Scheduling")}>Scheduling</button>
                <button onClick={() => this.handleFilter("Enterprise")}>Enterprise</button>
            </div>
        )
    }
}