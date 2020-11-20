import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignUpFormPage from "./components/SignUpFormPage";
import Navigation from './components/Navigation'
import ImageUploadForm from './components/ImageUploadForm'
import * as sessionActions from "./store/session";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);
	return (
		isLoaded && (
			<React.Fragment>
				<Navigation />
				<ImageUploadForm />
				<Switch>
					<Route path="/login" component={LoginFormPage} />
					<Route path="/signup" component={SignUpFormPage} />
				</Switch>
			</React.Fragment>
		)
	);
}

export default App;
