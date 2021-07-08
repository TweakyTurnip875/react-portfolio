import React from "react";
import { Link } from "react-router-dom";

const BlogItem = (props) => {
	const { title, id, content } = props.blogItem;
	return (
		<div className="title-content" style={{paddingBottom: "40px"}}>
			<Link to={`/b/${id}`}>
				<h1 style={{fontSize: "1.5em"}}>{title}</h1>
			</Link>
			<div>{content}</div>
		</div>
	);
};

export default BlogItem;
