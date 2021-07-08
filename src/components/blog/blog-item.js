import React from 'react'
import { Link } from 'react-router-dom'

const BlogItem = (props) => {
    const {
        title,
        id,
        content
    } = props.blogItem
    return (
        <div>
            <Link to={`/b/${id}`}>
                <h1>{title}</h1>
            </Link>
            <div>
                {content}
            </div>
        </div>
    )
}

export default BlogItem;