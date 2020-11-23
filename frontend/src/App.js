import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignUpFormPage from "./components/SignUpFormPage";
import FeedContainer from "./components/FeedContainer";
import Navigation from './components/Navigation'
import ImageUploadForm from './components/ImageUploadForm'
import * as sessionActions from "./store/session";
import UserFeed from "./components/UserFeed";

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
				{/* <ImageUploadForm /> */}
				<Switch>
					<Route path="/photos/:id" component={UserFeed} />
					<Route path="/login" component={LoginFormPage} />
					<Route path="/signup" component={SignUpFormPage} />
					<Route path="/upload" component={ImageUploadForm} />
					<Route exact path="/" component={FeedContainer} />
				</Switch>
			</React.Fragment>
		)
	);
}

export default App;
