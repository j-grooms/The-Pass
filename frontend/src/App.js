import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import FeedContainer from "./components/FeedContainer";
import Navigation from './components/Navigation'
import ImageUploadForm from './components/ImageUploadForm'
import * as sessionActions from "./store/session";
import LoginFormPage from "./components/LoginFormPage";
import SignUpFormPage from "./components/SignUpFormPage";
import UserFeed from "./components/UserFeed";
import SplashPage from "./components/SplashPage";
import DisplayPhoto from "./components/DisplayPhoto";

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
					<Route exact path="/" component={SplashPage} />
					<Route path="/login" component={LoginFormPage} />
					<Route path="/signup" component={SignUpFormPage} />
					<Route path="/upload" component={ImageUploadForm} />
					<Route path="/feed" component={FeedContainer} />
					<Route path="/:id/:name" component={DisplayPhoto} />
					<Route path="/:id(\d+)" component={UserFeed} />
				</Switch>
			</React.Fragment>
		)
	);
}

export default App;
