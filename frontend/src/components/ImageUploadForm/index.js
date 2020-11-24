import React, { useState } from "react";
import { fetch } from "../../store/csrf";
import {useSelector} from 'react-redux'
import "./imageUploadForm.css";
import { Redirect } from "react-router-dom";

const ImageUploadForm = () => {
	const [image, setImage] = useState("");
  const [imageurl, setImageurl] = useState("");
  const currentUser = useSelector((state) => state.session.user);

  if (!currentUser) return <Redirect to="/" />

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(image)
		// attach this to the body, no need to stringify
		// Content-Type: <for images>
		const data = new FormData();
		if (image) {
			data.append("img", image);
			for (let value of data.values()) {
				console.log("data", value);
			}
			submitS3(data);
		}
	};

	const submitS3 = async (data) => {
		console.log("DATA", data);
		const res = await fetch("/api/s3/post_file", {
			method: "POST",
			// headers: { "Content-Type": "image/jpg" },
			body:  data , currentUser
		});
	};

	const handleChange = (e) => {
		const file = e.target.files[0];
		const fileReader = new FileReader();
		setImage(file);
		console.log(image);
		if (file) {
			fileReader.readAsDataURL(file);
			fileReader.onloadend = () => {
				setImageurl(fileReader.result);
			};
		}
	};

	return (
		<div>
			<p className="file-header">Please select your photo below:</p>
			<div className="form-div">
				{image ? (
					<img className="user-image" src={imageurl} alt="userPhoto" />
				) : (
					<p className="file-preview-text">
						After selecting, a preview will appear here
					</p>
				)}
				<form onSubmit={handleSubmit} className="upload-form">
					<label className="upload-choice" for="upload">
						Select Photo
					</label>
					<input
						id="upload"
						type="file"
						accept="image/*"
						onChange={handleChange}
						className="file-field"
					/>
					{image? (<fieldset className="tags-fieldset">
						<legend className="legend-text">
							Help others find your image! Select a tag (or more):
						</legend>
						<div className="check-div">
							<input className="tag-checkbox" type="checkbox" id="breakfast" />
							<label className="tag-label" for="breakfast">
								Breakfast
							</label>
						</div>
						<div className="check-div">
							<input className="tag-checkbox" type="checkbox" id="entree" />
							<label className="tag-label" for="entree">
								Entree
							</label>
						</div>
						<div className="check-div">
							<input className="tag-checkbox" type="checkbox" id="dessert" />
							<label className="tag-label" for="dessert">
								Dessert
							</label>
						</div>
						<div className="check-div">
							<input className="tag-checkbox" type="checkbox" id="beef" />
							<label className="tag-label" for="beef">
								Beef
							</label>
						</div>
						<div className="check-div">
							<input className="tag-checkbox" type="checkbox" id="seafood" />
							<label className="tag-label" for="seafood">
								Seafood
							</label>
						</div>
						<div className="check-div">
							<input className="tag-checkbox" type="checkbox" id="chicken" />
							<label className="tag-label" for="chicken">
								Chicken
							</label>
						</div>
						<div className="check-div">
							<input className="tag-checkbox" type="checkbox" id="salad" />
							<label className="tag-label" for="salad">
								Salad
							</label>
						</div>
						<div className="check-div">
							<input className="tag-checkbox" type="checkbox" id="lamb" />
							<label className="tag-label" for="lamb">
								Lamb
							</label>
						</div>
					</fieldset>) : (<></>) }
					<button type="submit" className="login-submit">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default ImageUploadForm;
