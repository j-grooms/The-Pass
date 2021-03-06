import { fetch } from "./csrf";
// import sessionReducer from "./session";

const GET_ALL = "photos/getAll";
const GET_USER_PHOTOS = "photos/getByUser";
const GET_BY_TAG = "photos/getByTag";

// action creator modifies store
const allPhotos = (photos) => {
	return {
		type: GET_ALL,
		payload: photos,
	};
};

// action creator for user photos
const userPhotos = (photos) => {
	return {
		type: GET_USER_PHOTOS,
		payload: photos,
	};
};

// action creator for photos by tag
const tagPhotos = (photos) => {
	return {
		type: GET_BY_TAG,
		payload: photos,
	};
};

// does fetch for photos by tag
export const getPhotosByTag = (tag) => async (dispatch) => {
  const response = await fetch(`/api/photos/tag/${tag}`);
  // console.log(response)
  dispatch(tagPhotos(response.data));
  return response;
};

// does fetch call and invokes action creator above with payload
export const getAllPhotos = () => async (dispatch) => {
	const response = await fetch("/api/photos");
	dispatch(allPhotos(response.data));
	return response;
};

// does fetch call for user's photos
export const getPhotosByUser = (id) => async (dispatch) => {
	const response = await fetch(`/api/photos/${id}`);
	dispatch(userPhotos(response.data));
	return response;
};

// reduces the payload into the state
const photoReducer = (state = { photos: null }, action) => {
	let newState;
	switch (action.type) {
		case GET_ALL:
			newState = Object.assign({}, state);
			newState.photos = action.payload;
			return newState;
		case GET_USER_PHOTOS:
			newState = Object.assign({}, state);
			newState.photos = action.payload;
      return newState;
    case GET_BY_TAG:
      newState = Object.assign({}, state);
      newState.photos = action.payload;
      return newState;
		default:
			return state;
	}
};

// export for use in rootReducer
export default photoReducer;
