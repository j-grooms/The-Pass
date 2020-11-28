import React from "react";
import "./Photo.css";

const Photo = (props) => {
	return (
		<img
			className="feed-photo"
			src={`https://s3.us-east-2.amazonaws.com/the-pass/${props.photo}`}
			alt="feed"
		/>
	);
};

export default Photo;
