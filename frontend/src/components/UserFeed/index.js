import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as photoActions from "../../store/photos";
import Photo from "../Photo";

const UserFeed = () => {
	const statePhotos = useSelector((state) => state.photos);
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		// console.log("PARAMS", id)
		console.log(statePhotos)
		return dispatch(photoActions.getPhotosByUser(id));
	}, [dispatch, id, statePhotos]);

	return (
		 (
			<div>
				{/* {console.log(statePhotos)} */}
				<p>{id}</p>
				{statePhotos ? statePhotos.photos.map(photo => <Photo photo={photo.filename}/>): <></>}
			</div>
		)
	);
};

export default UserFeed;
