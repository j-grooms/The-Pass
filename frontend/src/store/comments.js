import { fetch } from "./csrf";

const GET_PHOTO_COMMENTS = "photos/Comments";

// action creator for comments
const photoComments = (comments) => {
	return {
		type: GET_PHOTO_COMMENTS,
		payload: comments,
	};
};


//action creator for comment creation
export const postComment = (data) => async(dispatch) => {
	await fetch('/api/photos/comment', {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(data),
	});

}

// does fetch call and invokes action creator with payload
export const getPhotoComments = (id) => async (dispatch) => {
	const response = await fetch(`/api/photos/${id}/comments`);
	dispatch(photoComments(response.data));
	return response;
};

const commentReducer = (state = { comments: null }, action) => {
	let newState;
	switch (action.type) {
		case GET_PHOTO_COMMENTS:
			newState = Object.assign({}, state);
			newState.comments = action.payload;
			return newState;
		default:
			return state;
	}
};

export default commentReducer;
