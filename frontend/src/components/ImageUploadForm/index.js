import React, { useState } from "react";
import { fetch } from "../../store/csrf";
import "./imageUploadForm.css";

const ImageUploadForm = () => {
	const [image, setImage] = useState("");
	const [imageurl, setImageurl] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(image)
		// attach this to the body, no need to stringify
		// Content-Type: <for images>
		const data = new FormData();
		if (image) {
			data.append("img", image);
			// data['img'] = image
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
			headers: { "Content-Type": "image/jpg" },
			body: { data },
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
				<img
					className="user-image"
					src={imageurl}
					alt="userPhoto"
				/>
			) : (
        <p className="file-preview-text">After selecting, a preview will appear here</p>
			)}
			<form onSubmit={handleSubmit} className="upload-form">
        <label className="upload-choice" for="upload">Select Photo</label>
				<input id="upload" type="file" accept="image/*" onChange={handleChange} className="file-field" />
				<button type="submit" className="login-submit">
					Submit
				</button>
			</form>

		</div>
    </div>
	);
};

export default ImageUploadForm;
