import { fetch } from "./csrf";
// import sessionReducer from "./session";

const GET_ALL = "photos/getAll";

// action creator modifies store
const allPhotos = (photos) => {
	return {
		type: GET_ALL,
		payload: photos,
	};
};

// does fetch call and invokes action creator above with payload
export const getAllPhotos = () => async (dispatch) => {
	const response = await fetch("api/users/photos");
	dispatch(allPhotos(response.data));
	return response;
};

// reduces the payload into the state
const photoReducer = (state = {photos: null}, action) => {
  let newState
  switch (action.type) {
    case GET_ALL:
      newState = Object.assign({}, state);
      newState.photos = action.payload;
      return newState;
    default:
      return state;
  }
}

// export for use in rootReducer
export default photoReducer;
