import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import * as photoActions from "../../store/photos";
import Photo from "../Photo";
import "./displayPhoto.css";

const DisplayPhoto = () => {
	const statePhotos = useSelector((state) => state.photo);
	const { id, name } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		return dispatch(photoActions.getPhotosByUser(id)).catch((res) =>
			console.log("Error")
		);
  }, [dispatch]);

  useEffect(() => {}, [name])

	return (
		statePhotos && (
			<>
				<div className="display-container">
					<img
						className="display-photo"
						src={`https://s3.us-east-2.amazonaws.com/the-pass/${name}`}
						alt="feed"
					/>
				</div>
				<p className="other-photos-header">All photos by this user:</p>
				<div className="preview-container">
					{statePhotos.photos.map((photo) => (
						<div className="preview-photo">
							<Link to={`/${photo.userId}/${photo.filename}`}>
								<Photo photo={photo.filename} />
							</Link>
						</div>
					))}
				</div>
			</>
		)
	);
};

export default DisplayPhoto;
