import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, Redirect } from "react-router-dom";
import { fetch } from "../../store/csrf";
import * as photoActions from "../../store/photos";
import * as commentActions from "../../store/comments";
import Photo from "../Photo";
import "./displayPhoto.css";

const DisplayPhoto = () => {
	const statePhotos = useSelector((state) => state.photo);

	const [comments, setComments] = useState("");
	const [comment, setComment] = useState("");
	const [userId, setUserId] = useState("");
	// const [username, setUsername] = useState("");
	const { id, name } = useParams();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.session.user);

	useEffect(() => {
		(async () => {
			// await dispatch(photoActions.getAllPhotos())
			const commentData = await fetch(`/api/photos/comments/${name}`);
			setComments(commentData);
		})();

		setUserId(currentUser.id);

		return dispatch(photoActions.getPhotosByUser(id));
	}, [dispatch, id, name, userId, comment, currentUser]);

	if (!currentUser) return <Redirect to="/" />;

	const handleCommentSubmission = (e) => {
		e.preventDefault();
		let currentPhotoId;
		statePhotos.photos.map((photo) => {
			if (photo.filename === name) currentPhotoId = photo.photoId;
			return currentPhotoId;
		});

		dispatch(
			commentActions.postComment({ photoId: currentPhotoId, comment, userId })
		);
		setComment("");
	};
	//
	return (
		statePhotos &&
		comments && (
			<div className="grid-div">
				<div className="grid-display">
					<p className="display-username">
						Uploaded by: {statePhotos.photos[0].username}
					</p>
					<div className="display-container">
						<img
							className="display-photo"
							src={`https://s3.us-east-2.amazonaws.com/the-pass/${name}`}
							alt="feed"
						/>
					</div>
				</div>
				<div className="grid-comments">
					<p className="comments-header">Comments</p>
					<div className="comments-container">
						{comments.data.map((comment, id) => (
							<div className="comment" key={id}>
								<p className="comment-user" key={id}>
									{comment.username}
								</p>
								<p className="comment-content" key={comment.username}>
									{comment.comment}
								</p>
							</div>
						))}
					</div>
					<div className="comment-form-container">
						<form className="comment-form">
							<input
								type="text"
								className="comment-field"
								value={comment}
								placeholder="Comment on this photo..."
								onChange={(e) => setComment(e.target.value)}
							/>
							<button
								className="comment-submit"
								onClick={handleCommentSubmission}
							>
								Post
							</button>
						</form>
					</div>
				</div>
				<div className="grid-other">
					<p className="other-photos-header">All photos by this user:</p>
					<div className="preview-container">
						{statePhotos.photos.map((photo) => (
							<div className="preview-photo" key={photo.filename}>
								<Link
									to={`/${photo.userId}/${photo.filename}`}
									key={photo.filename}
								>
									<Photo photo={photo.filename} key={photo.filename} />
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	);
};

export default DisplayPhoto;
