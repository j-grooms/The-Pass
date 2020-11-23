import React, {useEffect } from 'react';
import * as photoActions from "../../store/photos";
import {useDispatch, useSelector} from "react-redux";
import Photo from '../Photo'
import './FeedContainer.css'
import { Link, Redirect, Switch } from 'react-router-dom';

const FeedContainer = () => {
  // Subscribe to store
  const statePhotos = useSelector((state) => state.photo);
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state.session.user)

  // will run on intial mount and any subsequent dispatch actions.
  useEffect(() => {
		// console.log("dispatch")

    // dispatches custom action
    return dispatch(photoActions.getAllPhotos()).catch((res) => console.log("ERROR"));

  }, [dispatch])

	if (!currentUser) return <Redirect to="/" />
  // statePhoto.photos is needed, as that is where the null value lives
  return (
		statePhotos.photos && (
			<div className="feed-container">
				{console.log(statePhotos.photos)}
				{statePhotos.photos.map((photo) => (
					<div className="feed-item">
						<Link to={`${photo.userId}/${photo.filename}`}>
							<Photo photo={photo.filename} />
						</Link>
					</div>
				))}
			</div>
		)
	);


}

export default FeedContainer;
