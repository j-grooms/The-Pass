// submits the photo to Amazon S3
export const submitS3 = (data) => async (dispatch) => {
	const response = await fetch("/api/s3/post_file", {
		method: "POST",
		body: data,
	});
	return response;
};

export const createPhoto = (data) => async (dispatch) => {
	const response = await fetch("/api/photos/create", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return response;
};

export const createTags = (tags, photoId) => async(dispatch) => {
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

const submissionReducer = (state = { submit: null }, action) => {
	// let newState;
	switch (action.type) {
		default:
			return state;
	}
};

export default submissionReducer;
