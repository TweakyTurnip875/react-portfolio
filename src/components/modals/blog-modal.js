import React, { Component } from "react";
import ReactModal from "react-modal";

export default class BlogModal extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<ReactModal
				isOpen={this.props.blogModalOpen}
				onRequestClose={() => {
					this.props.handleModalClose();
				}}
			>
				<h1>this is a modal</h1>
			</ReactModal>
		);
	}
}
