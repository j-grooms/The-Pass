import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import SplashPage from "../SplashPage";

const SignUpFormPage = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	const dispatch = useDispatch();

	const currentUser = useSelector((state) => state.session.user);
	if (currentUser) return <Redirect to="/feed" />;

	const handleSubmission = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			return setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
		setErrors([]);
		return dispatch(sessionActions.signUp({ email, username, password })).catch(
			(res) => {
				if (res.data && res.data.errors) setErrors(res.data.errors);
			}
		);
	};

	return (
		<>
			<SplashPage />
			<div className="login-form-container">
				<form onSubmit={handleSubmission}>
					<p className="form-header">Let's Get Started!</p>
					<ul>
						{errors.map((error, i) => (
							<li key={i}>{error}</li>
						))}
					</ul>
					<p className="login-form-label">Username</p>
					<input
						className="login-field"
						type="text"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
					<p className="login-form-label">Email</p>
					<input
						className="login-field"
						type="text"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<p className="login-form-label">Password</p>
					<input
						className="login-field"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
					<p className="login-form-label">Confirm Password</p>
					<input
						className="login-field"
						type="password"
						onChange={(e) => setConfirmPassword(e.target.value)}
						value={confirmPassword}
					/>
					<div className="login-button-holder">
						<button className="login-submit">Register</button>
					</div>
				</form>
			</div>
			<div className="form-links">
				{/* <Link to="/login" className="login-footer-link">
					Already Have an Account?
				</Link> */}
			</div>
		</>
	);
};

export default SignUpFormPage;
