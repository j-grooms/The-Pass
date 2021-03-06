import React, { useState } from "react";
import { fetch } from "../../store/csrf";
import { useSelector } from "react-redux";
import "./imageUploadForm.css";
import { Redirect } from "react-router-dom";

const ImageUploadForm = (props) => {
	const [image, setImage] = useState("");
	const [imageurl, setImageurl] = useState("");

	const [breakfast, setBreakfast] = useState(false);
	const [dessert, setDessert] = useState(false);
	const [entree, setEntree] = useState(false);
	const [beef, setBeef] = useState(false);
	const [seafood, setSeafood] = useState(false);
	const [chicken, setChicken] = useState(false);
	const [lamb, setLamb] = useState(false);
	const [salad, setSalad] = useState(false);

	const tags = {
		breakfast,
		dessert,
		entree,
		beef,
		seafood,
		chicken,
		lamb,
		salad,
	};

	const currentUser = useSelector((state) => state.session.user);
	if (!currentUser) return <Redirect to="/" />;

	const handleSubmit = (e) => {
		e.preventDefault();

		// attach this to the body
		const data = new FormData();

		if (image) {
			data.append("img", image);
			submitS3(data);
		}
	};

	const submitS3 = async (data) => {
		await fetch("/api/s3/post_file", {
			method: "POST",
			body: data,
		}).then((res) => {
			const dbData = {
				fileName: res.data,
				userId: currentUser.id,
			};

			createPhoto(dbData);
		});
		props.history.push("/feed");
	};

	const createPhoto = async (data) => {
		await fetch("/api/photos/create", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		}).then((res) => {
			createTags(tags, res.data.id);
		});
	};

	const createTags = async (tags, photoId) => {
		let selectedTags = [];
		// iterate through tags and check thier individual states
		// push only the applied tag names to the above array
		for (let tag in tags) {
			if (tags[tag] === true) selectedTags.push(tag);
		}

		const dbData = {
			photoId,
			tags: selectedTags,
		};

		await fetch("/api/photos/tags", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(dbData),
		});
	};

	// display the image as a preview, using a filereader
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
						// Once image is selected, the tags will appear

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
