import React, { Component } from "react";
import axios from "axios";
import { DropzoneComponent } from "react-dropzone-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../../node_modules/dropzone/dist/min/dropzone.min.css";
import "../../../node_modules/react-dropzone-component/styles/filepicker.css";

export default class PortfolioForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			description: "",
			position: "",
			url: "",
			category: "Entertainment",
			thumb_image: "",
			banner_image: "",
			logo: "",
			editMode: false,
			apiUrl:
				"https://tweakyturnip875.devcamp.space/portfolio/portfolio_items/",
			apiReq: "post",
		};
		this.componentConfig = this.componentConfig.bind(this);
		this.djsConfig = this.djsConfig.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleThumbDrop = this.handleThumbDrop.bind(this);
		this.handleBannerDrop = this.handleBannerDrop.bind(this);
		this.handleLogoDrop = this.handleLogoDrop.bind(this);

		this.thumbRef = React.createRef();
		this.bannerRef = React.createRef();
		this.logoRef = React.createRef();
	}


	componentDidUpdate() {
		if (Object.keys(this.props.editData).length > 0) {
			const {
				id,
				name,
				description,
				category,
				position,
				url,
				thumb_image_url,
				banner_image_url,
				logo_url,
			} = this.props.editData;

			this.props.clearEditData(); // prevents from setting state more than it's supposed to.

			this.setState({
				id: id,
				name: name || "",
				description: description || "",
				position: position || "",
				url: url || "",
				category: category || "Entertainment",
				editMode: true,
				apiUrl: `https://tweakyturnip875.devcamp.space/portfolio/portfolio_items/${id}`,
				apiReq: "patch",
				thumb_image_url: thumb_image_url || "",
				banner_image_url: banner_image_url || "",
				logo_url: logo_url || "",
			});
		}
	}
	componentConfig() {
		return {
			iconFiletypes: [".jpg", ".png", ".gif"],
			showFiletypeIcon: true,
			postUrl: "https://httpbin.org/post",
		};
	}
	djsConfig() {
		return {
			addRemoveLinks: true,
			maxFiles: 1,
		};
	}
	buildForm() {
		let formData = new FormData();

		formData.append("portfolio_item[name]", this.state.name);
		formData.append("portfolio_item[description]", this.state.description);
		formData.append("portfolio_item[url]", this.state.url);
		formData.append("portfolio_item[position]", this.state.position);
		formData.append("portfolio_item[category]", this.state.category);

		if (this.state.thumb_image) {
			formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
		}
		if (this.state.banner_image) {
			formData.append("portfolio_item[banner_image]", this.state.banner_image);
		}
		if (this.state.logo) {
			formData.append("portfolio_item[logo]", this.state.logo);
		}

		return formData;
	}
	handleThumbDrop() {
		return {
			addedfile: (file) => this.setState({ thumb_image: file }),
		};
	}
	handleBannerDrop() {
		return {
			addedfile: (file) => this.setState({ banner_image: file }),
		};
	}
	handleLogoDrop() {
		return {
			addedfile: (file) => this.setState({ logo: file }),
		};
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}
	handleSubmit(event) {
		axios({
			method: this.state.apiReq,
			url: this.state.apiUrl,
			data: this.buildForm(),
			withCredentials: true,
		})
			.then((res) => {
				if (this.state.editMode) {
					this.props.handleEditFormSubmission();
				} else {
					this.props.handleNewFormSubmission(res.data.portfolio_item);
				}


				this.setState({
					name: "",
					description: "",
					position: "",
					url: "",
					category: "Entertainment",
					thumb_image: "",
					banner_image: "",
					logo: "",
					editMode: false,
					apiUrl:
						"https://tweakyturnip875.devcamp.space/portfolio/portfolio_items/",
					apiReq: "post",
				});
				[this.thumbRef, this.bannerRef, this.logoRef].forEach((ref) => {
					ref.current.dropzone.removeAllFiles();
				});
			})
			.catch((error) => {
				console.log("portfolio form submit error", error);
			});

		event.preventDefault();
	}
	deleteImage(image) {
		axios
			.delete(
				`https://tweakyturnip875.devcamp.space/portfolio/delete-portfolio-image/${this.state.id}?image_type=${image}`, 
				{ withCredentials: true }
			)
			.then((res) => {
				this.setState({
					[`${image}_url`]: ""
				})
			})
			.catch(error => {
				console.log(error)
			})
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
				<div className="two-column">
					<input
						type="text"
						name="name"
						placeholder="Portfolio Item Name"
						value={this.state.name}
						onChange={this.handleChange}
					/>

					<input
						type="text"
						name="url"
						placeholder="URL"
						value={this.state.url}
						onChange={this.handleChange}
					/>
				</div>
				<div className="two-column">
					<input
						type="text"
						name="position"
						placeholder="Position"
						value={this.state.position}
						onChange={this.handleChange}
					/>
					<select
						name="category"
						value={this.state.category}
						onChange={this.handleChange}
						className="select-element"
					>
						<option value="Entertainment">Entertainment</option>
						<option value="Scheduling">Scheduling</option>
						<option value="Learning">Learning</option>
					</select>
				</div>
				<div className="one-column">
					<textarea
						type="text"
						name="description"
						placeholder="Description"
						value={this.state.description}
						onChange={this.handleChange}
					/>
				</div>

				<div className="image-uploaders">
					{this.state.thumb_image_url && this.state.editMode ? (
						<div className="portfolio-manager-edit-image">
							<img src={this.state.thumb_image_url} />

							<div className="image-delete-link">
								<a onClick={() => this.deleteImage("thumb_image")}>
									<FontAwesomeIcon icon="times" className="file-removal-icon" />
								</a>
							</div>
						</div>
					) : (
						<DropzoneComponent
							ref={this.thumbRef}
							config={this.componentConfig()}
							djsConfig={this.djsConfig()}
							eventHandlers={this.handleThumbDrop()}
						>
							<div className="dz-message">Thumbnail</div>
						</DropzoneComponent>
					)}

					{this.state.banner_image_url && this.state.editMode ? (
						<div className="portfolio-manager-edit-image">
							<img src={this.state.banner_image_url} />

							<div className="image-delete-link">
								<a onClick={() => this.deleteImage("banner_image")}>
									<FontAwesomeIcon icon="times" className="file-removal-icon" />
								</a>
							</div>
						</div>
					) : (
						<DropzoneComponent
							ref={this.bannerRef}
							config={this.componentConfig()}
							djsConfig={this.djsConfig()}
							eventHandlers={this.handleBannerDrop()}
						>
							<div className="dz-message">Banner</div>
						</DropzoneComponent>
					)}

					{this.state.logo_url && this.state.editMode ? (
						<div className="portfolio-manager-edit-image">
							<img src={this.state.logo_url} />

							<div className="image-delete-link">
								<a onClick={() => this.deleteImage("logo")}>
									<FontAwesomeIcon icon="times" className="file-removal-icon" />
								</a>
							</div>
						</div>
					) : (
						<DropzoneComponent
							ref={this.logoRef}
							config={this.componentConfig()}
							djsConfig={this.djsConfig()}
							eventHandlers={this.handleLogoDrop()}
						>
							<div className="dz-message">Logo</div>
						</DropzoneComponent>
					)}
				</div>
				<div>
					<button className="btn" type="submit">
						Save
					</button>
				</div>
			</form>
		);
	}
}
