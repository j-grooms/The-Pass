import React, {useEffect } from 'react';
import * as photoActions from "../../store/photos";
import {useDispatch, useSelector} from "react-redux";
import Photo from '../Photo'
import './FeedContainer.css'

const FeedContainer = () => {
  // Subscribe to store
  const statePhotos = useSelector((state) => state.photo);
  const dispatch = useDispatch();

  // will run on intial mount and any subsequent dispatch actions.
  useEffect(() => {
    // console.log("dispatch")

    // dispatches custom action
    return dispatch(photoActions.getAllPhotos()).catch((res) => console.log("ERROR"));

  }, [dispatch])

  // statePhoto.photos is needed, as that is where the null value lives
  return ( statePhotos.photos &&
		(<div className="feed-container">
			{statePhotos.photos.map((photo) => (
				<div className="feed-item"><Photo photo={photo} /></div>
			))}
		</div>)
	);


}

export default FeedContainer;
