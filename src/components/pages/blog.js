import React from "react";
import { Link } from "react-router-dom"

export default function (props) {
  return (
    <div>
      <h2>blog</h2>
      <div>
        <Link to="/about">Read More</Link>
      </div>
    </div>
  );
}