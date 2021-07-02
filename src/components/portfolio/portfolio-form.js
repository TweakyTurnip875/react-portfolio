import React, { Component } from 'react';

export default class PortfolioForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            description: "",
            position: "",
            url: "",
            category: "",
            thumb_image: "",
            banner_image: "",
            logo: ""

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    getFormData() {
        let formData = new FormData()

        formData.append("portfolio_item[name]", this.state.name);
        formData.append("portfolio_item[description]", this.state.description);
        formData.append("portfolio_item[url]", this.state.url);
        formData.append("portfolio_item[category]", this.state.position)
        formData.append("portfolio_item[category]", this.state.category);
        
        return formData
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit(event) {
        this.getFormData()
        event.preventDefault()
    }
    render() {
        return(
        <div>
            <h1>PortfolioForm</h1>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input 
                        type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />

                    <input 
                        type="text"
                        name="url"
                        placeholder="url"
                        value={this.state.url}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <input 
                        type="text"
                        name="position"
                        placeholder="position"
                        value={this.state.position}
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text"
                        name="category"
                        placeholder="category"
                        value={this.state.category}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <input 
                        type="text"
                        name="description"
                        placeholder="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <button type="submit">save</button>
                </div>
            </form>
        </div>
        )
    }
}