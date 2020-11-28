import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Photo from "../Photo";
import "./tagSearchPage.css";
import * as photoActions from "../../store/photos";

const TagSearchPage = () => {
	const statePhotos = useSelector((state) => state.photo);
	const currentUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {}, [statePhotos]);

	if (!currentUser) return <Redirect to="/" />;

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(searchValue);
		dispatch(photoActions.getPhotosByTag(searchValue));
	};

	return (
		<>
			<div className="tag-search-container">
				<p className="tag-form-header">Select a Tag and hit Search!</p>
				<form className="tag-form" onSubmit={handleSubmit}>
					<select
						className="tag-select"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					>
						<option value="">Select a Tag...</option>
						<option value="breakfast">Breakfast</option>
						<option value="entree">Entree</option>
						<option value="dessert">Dessert</option>
						<option value="beef">Beef</option>
						<option value="seafood">Seafood</option>
						<option value="chicken">Chicken</option>
						<option value="lamb">Lamb</option>
						<option value="salad">Salad</option>
					</select>
					<button className="tag-button">Search</button>
				</form>
			</div>
			{statePhotos.photos ? (
				<div className="tag-feed-container">
					{statePhotos.photos.map((photo) => (
						<div className="feed-item" key={photo.filename}>
							<Link
								to={`/${photo.userId}/${photo.filename}`}
								key={photo.filename}
							>
								<Photo photo={photo.filename} key={photo.filename} />
							</Link>
						</div>
					))}
				</div>
			) : (
				<> </>
			)}
		</>
	);
};

export default TagSearchPage;
