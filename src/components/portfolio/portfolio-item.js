import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PortfolioItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolioItemClass: ""
    }
  }
  /*
      Data that we will need:
      - background img: thumb_image_url
      - logo: logo_url
      - description: description
      - id: id
    */
  handleMouseEnter() {
    this.setState({
      portfolioItemClass: "img-blur"
    })
  }
  handleMouseLeave() {
    this.setState({
      portfolioItemClass: ""
    })
  }
  render() {
  const { id, description, thumb_image_url, logo_url } = this.props.item;
  return (
    <div className="portfolio-item-wrapper"
      onMouseEnter={() => this.handleMouseEnter()}
      onMouseLeave={() => this.handleMouseLeave()}
    >
      <div 
        className={"portfolio-img-background " + this.state.portfolioItemClass}
        style={{
          backgroundImage: "url(" + thumb_image_url + ")"
        }}
      />
      <div className="img-txt-wrapper">
        <div className="logo-wrapper">
        <img src={logo_url}></img>
        </div>
        <div className="subtitle">{description}</div>
      </div>
      
    </div>
  );
}
}
