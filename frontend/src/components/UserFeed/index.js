import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as photoActions from "../../store/photos";

const UserFeed = () => {
	const statePhotos = useSelector((state) => state.photos);
	const {id} = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
    // console.log("PARAMS", id)
	  return dispatch(photoActions.getPhotosByUser(id))
	}, [dispatch, id])

	return ( 
		(<div>
			{console.log(statePhotos)}
			<p>{id}</p>
		</div>)
	);
};

export default UserFeed;
