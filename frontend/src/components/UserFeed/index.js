import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as photoActions from "../../store/photos";

const UserFeed = () => {
	const statePhotos = useSelector((state) => state.photos.photos);
	const {id} = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
    console.log("PARAMS", id)
	  // return dispatch(photoActions.getPhotosByUser())
	}, [])

	return (<div>{id}</div>);
};

export default UserFeed;
