import React from 'react';
import { Link } from 'react-router-dom';
import Trunctate from 'react-truncate';
import striptags from 'striptags';

const BlogItem = (props) => {
	const { title, id, content } = props.blogItem;
	return (
		<div className="title-content" style={{ paddingBottom: '40px' }}>
			<Link to={`/b/${id}`}>
				<h1 style={{ fontSize: '1.5em' }}>{title}</h1>
			</Link>
			<div>
				<Trunctate
					lines={5}
					ellipsis={
						<span>
							...<Link to={`/b/${id}`}>read more</Link>
						</span>
					}
				>
					{striptags(content)}
				</Trunctate>
			</div>
		</div>
	);
};

export default BlogItem;
