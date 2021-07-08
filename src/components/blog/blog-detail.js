import React from 'react'

const BlogDetail = (props) => {
    return (
        <div>
            <h1>blog details for {props.match.params.slug}</h1>
        </div>
    )
}

export default BlogDetail