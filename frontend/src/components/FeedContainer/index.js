import React, {useEffect, useState} from 'react';
import * as photoActions from "../../store/photos";
import {useDispatch, useSelector} from "react-redux";
import Photo from '../Photo'

const FeedContainer = () => {
  // Subscribe to store
  const statePhotos = useSelector((state) => state.photo);
  const dispatch = useDispatch();
  // const [photos, setPhotos] = useState('');

  // will run on intial mount and any subsequent dispatch actions.
  useEffect(() => {
    console.log("dispatch")
    // dispatches custom action
    return dispatch(photoActions.getAllPhotos()).catch((res) => console.log("ERROR"));

  }, [dispatch])


  return ( statePhotos &&
		<div>
			{console.log(statePhotos.photos)}
			{statePhotos.photos.map((photo) => (
				<Photo photo={photo} />
			))}
		</div>
	);


}

export default FeedContainer;
