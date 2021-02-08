import React, { useState } from "react";
import "./Photo.css";

const Photo = (props) => {
	const [loaded, setLoaded] = useState(false);

	return (
		<div className="photo-container">
			<img
				onLoad={() => setLoaded(true)}
				className="feed-photo"
				src={`https://s3.us-east-2.amazonaws.com/the-pass/${props.photo}`}
				alt="feed"
			/>
			{loaded ? <></> : <div className="loading-screen"><p>Loading...</p></div>}
		</div>
	);
};

export default Photo;
