import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, Redirect } from "react-router-dom";
import { fetch } from "../../store/csrf";
import * as photoActions from "../../store/photos";
import Photo from "../Photo";
import "./displayPhoto.css";

const DisplayPhoto = () => {
	const statePhotos = useSelector((state) => state.photo);

	const [comments, setComments] = useState("");
	const [comment, setComment] = useState("");
	const [userId, setUserId] = useState("");
	const { id, name } = useParams();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.session.user);

	useEffect(() => {
		(async () => {
			const commentData = await fetch(`/api/photos/comments/${name}`);
			setComments(commentData);
		})();

		setUserId(currentUser.id);
		console.log("USER ID", userId);

		return dispatch(photoActions.getPhotosByUser(id)).catch((res) =>
			console.log("Error")
		);
	}, [dispatch, id, name, userId]);

	if (!currentUser) return <Redirect to="/" />;

	const handleCommentSubmission = () => {};

	return (
		statePhotos &&
		comments && (
			<div className="grid-div">
				<div className="grid-display">
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
						{/* {console.log("COMMENTS", comments)} */}
						{comments.data.map((comment) => (
							<div className="comment">
								<p className="comment-user">{comment.username}</p>
								<p className="comment-content">{comment.comment}</p>
							</div>
						))}
					</div>
					<div className="comment-form-container">
						<form className="comment-form">
							<input
								type="text"
								className="comment-field"
								placeholder="Comment on this photo..."
								onChange={(e) => setComment(e.target.value)}
							/>
							<button className="comment-submit" onClick={handleCommentSubmission}>Post</button>
						</form>
					</div>
				</div>
				<div className="grid-other">
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
				</div>
			</div>
		)
	);
};

export default DisplayPhoto;
