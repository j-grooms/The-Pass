import { fetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
	return {
		type: SET_USER,
		payload: user,
	};
};

export const removeUser = () => {
	return {
		type: REMOVE_USER,
	};
};

export const login = (user) => async (dispatch) => {
	const { credential, password } = user;
	const response = await fetch("/api/session", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({
			credential,
			password,
		}),
	});
	dispatch(setUser(response.data.user));
	return response;
};

export const restoreUser = () => async(dispatch) => {
	const res = await fetch("/api/session")
	dispatch(setUser(res.data.user))
	return res;
}

export const signUp = (user) => async(dispatch) => {
	const { username, email, password } = user
	const res = await fetch("/api/users", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});
	dispatch(setUser(res.data.user))
	return res;
}

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/session", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
	});
	dispatch(removeUser());
	return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case SET_USER:
			newState = Object.assign({}, state);
			newState.user = action.payload;
			return newState;
		case REMOVE_USER:
			newState = Object.assign({}, state);
			newState.user = null;
			return newState;
		default:
			return state;
	}
};

export default sessionReducer;
