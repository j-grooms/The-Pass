import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from './ProfileButton'

const Navigation = () => {
	const currentUser = useSelector((state) => state.session.user);
	return (
		<ul className="nav-links">
			<li className="nav-list-item">
				<NavLink to="/">Home</NavLink>
			</li>
			{!currentUser ? (
				<>
					<li className="nav-list-item">
						<NavLink to="signup">Sign Up</NavLink>
					</li>
					<li className="nav-list-item">
						<NavLink to="/login">Log In</NavLink>
					</li>
				</>
			) : (
				<ProfileButton user={currentUser} />
			)}
		</ul>
	);
};

export default Navigation;
