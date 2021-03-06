import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as photoActions from "../../store/photos";
import Photo from "../Photo";

const UserFeed = () => {
	const statePhotos = useSelector((state) => state.photo);
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		return dispatch(photoActions.getPhotosByUser(id));
	}, [dispatch, id]);

	return (
		 (
			<div>
				{/* {console.log("STATE", statePhotos)} */}
				<p>{id}</p>
				{statePhotos.photos.map(photo => <Photo photo={photo.filename} key={photo.filename} />)}
			</div>
		)
	);
};

export default UserFeed;
