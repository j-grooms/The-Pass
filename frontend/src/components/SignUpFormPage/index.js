import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const SignUpFormPage = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	const dispatch = useDispatch();

	const currentUser = useSelector((state) => state.session.user);
	if (currentUser) return <Redirect to="/" />;

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
		<div className="login-form-container">
			<form onSubmit={handleSubmission}>
				<ul>
					{errors.map((error, i) => (
						<li key={i}>{error}</li>
					))}
				</ul>
				<p className="login-form-label">Username</p>
				<input
					type="text"
					onChange={(e) => setUsername(e.target.value)}
					value={username}
					className="login-field"
				/>
				<p className="login-form-label">Email</p>
				<input
					type="text"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					className="login-field"
				/>
				<p className="login-form-label">Password</p>
				<input
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					className="login-field"
				/>
				<p className="login-form-label">Confirm Password</p>
				<input
					type="password"
					onChange={(e) => setConfirmPassword(e.target.value)}
					value={confirmPassword}
					className="login-field"
				/>
				<div className="login-button-holder">
					<button className="login-submit">Register</button>
				</div>
			</form>
		</div>
	);
};

export default SignUpFormPage;
