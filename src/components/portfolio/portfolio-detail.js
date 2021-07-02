import React from 'react';


export default function(props) {
    return (
        <div>
            <h1>Portfolio Detail for {props.match.params.slug}</h1>
        </div>
    )
}