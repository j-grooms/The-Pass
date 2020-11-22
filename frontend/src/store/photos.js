import { fetch } from "./csrf";
// import sessionReducer from "./session";

const GET_ALL = "photos/getAll";

const allPhotos = (photos) => {
	return {
		type: GET_ALL,
		payload: photos,
	};
};

export const getAllPhotos = () => async (dispatch) => {
	const response = await fetch("api/users/photos");
	dispatch(allPhotos(response.data));
	return response;
};

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

export default photoReducer;
