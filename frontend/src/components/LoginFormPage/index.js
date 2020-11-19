import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const LoginFormPage = () => {
  const currentUser = useSelector(state => state.session.user)
	const dispatch = useDispatch();
	const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (currentUser) return <Redirect to="/" />

	const handleSubmission = (e) => {
      e.preventDefault();
			setErrors([]);
			return dispatch(sessionActions.login({ credential: username, password })).catch(
				(res) => {
					if (res.data && res.data.errors) setErrors(res.data.errors);
				}
			);
  };

	return (
		<React.Fragment>
			<form onSubmit={handleSubmission}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Username
					<input
						type="text"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</label>
        <button type="submit">Log In</button>
			</form>
		</React.Fragment>
	);
};

export default LoginFormPage;
