import React, { useState } from "react";
import { fetch } from "../../store/csrf";
import { useSelector } from "react-redux";
import "./imageUploadForm.css";
import { Redirect } from "react-router-dom";

const ImageUploadForm = () => {
	const [image, setImage] = useState("");
	const [imageurl, setImageurl] = useState("");
	const [breakfast, setBreakfast] = useState(false);
	const [dessert, setDessert] = useState(false);
	const [beef, setBeef] = useState(false);
	const [entree, setEntree] = useState(false);
	const [seafood, setSeafood] = useState(false);
	const [chicken, setChicken] = useState(false);
	const [salad, setSalad] = useState(false);
	const [lamb, setLamb] = useState(false);
	const currentUser = useSelector((state) => state.session.user);

	if (!currentUser) return <Redirect to="/" />;

	const handleSubmit = (e) => {
		e.preventDefault();

		// attach this to the body, no need to stringify
		// Content-Type: <for images>
		const data = new FormData();
		if (image) {
			data.append("img", image);
			submitS3(data);
		}
		return <Redirect to="/" />;
	};

	const submitS3 = async (data) => {
		// console.log("DATA", data);
		const res = await fetch("/api/s3/post_file", {
			method: "POST",
			// headers: { "Content-Type": "image/jpg" },
			body: data,
		});
		console.log(currentUser.id);
		console.log(res.data);
		const dbData = {
			fileName: res.data,
			userId: currentUser.id,
		};
		createPhoto(dbData);
	};

	const createPhoto = async (data) => {
		const res = await fetch("/api/photos/create", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		console.log(res);
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
					{image ? (
						<fieldset className="tags-fieldset">
							<legend className="legend-text">
								Help others find your image! Select a tag (or more):
							</legend>
							<div className="check-div">
								<input
									className="tag-checkbox"
									type="checkbox"
									checked={breakfast}
									onChange={() => setBreakfast(!breakfast)}
								/>
								<label className="tag-label" for="breakfast">
									Breakfast
								</label>
							</div>
							<div className="check-div">
								<input
									className="tag-checkbox"
									type="checkbox"
									checked={entree}
									onChange={() => setEntree(!entree)}
								/>
								<label className="tag-label" for="entree">
									Entree
								</label>
							</div>
							<div className="check-div">
								<input
									className="tag-checkbox"
									type="checkbox"
									checked={dessert}
									onChange={() => setDessert(!dessert)}
								/>
								<label className="tag-label" for="dessert">
									Dessert
								</label>
							</div>
							<div className="check-div">
								<input
									className="tag-checkbox"
									type="checkbox"
									checked={beef}
									onChange={() => setBeef(!beef)}
								/>
								<label className="tag-label" for="beef">
									Beef
								</label>
							</div>
							<div className="check-div">
								<input
									className="tag-checkbox"
									type="checkbox"
									checked={seafood}
									onChange={() => setSeafood(!seafood)}
								/>
								<label className="tag-label" for="seafood">
									Seafood
								</label>
							</div>
							<div className="check-div">
								<input
									className="tag-checkbox"
									type="checkbox"
									checked={chicken}
									onChange={() => setChicken(!chicken)}
								/>
								<label className="tag-label" for="chicken">
									Chicken
								</label>
							</div>
							<div className="check-div">
								<input
									className="tag-checkbox"
									type="checkbox"
									checked={salad}
									onChange={() => setSalad(!salad)}
								/>
								<label className="tag-label" for="salad">
									Salad
								</label>
							</div>
							<div className="check-div">
								<input
									className="tag-checkbox"
									type="checkbox"
									checked={lamb}
									onChange={() => setLamb(!lamb)}
								/>
								<label className="tag-label" for="lamb">
									Lamb
								</label>
							</div>
						</fieldset>
					) : (
						<></>
					)}
					<button type="submit" className="login-submit">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default ImageUploadForm;
