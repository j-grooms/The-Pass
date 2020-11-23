import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import SplashPage from "../SplashPage";

const LoginFormPage = () => {
	const currentUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (currentUser) return <Redirect to="/feed" />;

	const handleSubmission = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(
			sessionActions.login({ credential: username, password })
		).catch((res) => {
			if (res.data && res.data.errors) setErrors(res.data.errors);
		});
	};

	return (
		<>
		<SplashPage />
			<div className="login-form-container">
				<form onSubmit={handleSubmission}>
					<p className="form-header">Welcome Back.</p>
					<div>
						<ul>
							{errors.map((error, idx) => (
								<li key={idx}>{error}</li>
							))}
						</ul>
					</div>

					<p className="login-form-label">Username</p>

					<input
						className="login-field"
						type="text"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>

					<p className="login-form-label">Password</p>

					<input
						className="login-field"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
					<div className="login-button-holder">
						<button type="submit" className="login-submit">
							Log In
						</button>
					</div>
				</form>
			</div>
			<div className="form-links">
				{/* <Link to="/signup" className="login-footer-link">
					Don't Have an Account?
				</Link> */}
			</div>
		</>
	);
};

export default LoginFormPage;
