import React, { useEffect, useState } from "react";
import * as photoActions from "../../store/photos";
import { useDispatch, useSelector } from "react-redux";
import Photo from "../Photo";
import "./FeedContainer.css";
import { Link, Redirect } from "react-router-dom";

const FeedContainer = () => {
	// Subscribe to store
	const statePhotos = useSelector((state) => state.photo);
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.session.user);
	const [loaded, setLoaded] = useState(false);

	// will run on intial mount and any subsequent dispatch actions.
	useEffect(() => {
		// dispatches custom action
		(async () => {
			await dispatch(photoActions.getAllPhotos());
			return setLoaded(true);
		})()
	}, [dispatch]);

	if (!currentUser) return <Redirect to="/" />;

	// statePhoto.photos is needed to prevent map errors
	return loaded && (
		statePhotos.photos && (
			<div className="feed-container">
				{statePhotos.photos.map((photo) => (
					<div className="feed-item" key={photo.filename}>
						<Link
							to={`/${photo.userId}/${photo.filename}`}
							key={photo.filename}
						>
							<Photo photo={photo.filename} key={photo.filename} />
						</Link>
					</div>
				))}
			</div>
		)
	);
};

export default FeedContainer;
