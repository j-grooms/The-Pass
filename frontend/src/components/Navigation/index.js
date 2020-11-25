import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";

const Navigation = () => {
	const currentUser = useSelector((state) => state.session.user);
	return (
		<div className="nav-container">
			<ul className="nav-links">
				<li className="nav-list-item">
					<NavLink exact to="/" className="nav-link">
						Home
					</NavLink>
				</li>
				{!currentUser ? (
					<></>
				) : (
					<>
						<li className="nav-list-item">
							<NavLink to="/upload" className="nav-link">
								Upload an Image
							</NavLink>
						</li>
						<li className="nav-list-item">
							<NavLink to="/tags" className="nav-link">
								Search by Tag
							</NavLink>
						</li>
						<ProfileButton user={currentUser} />
					</>
				)}
			</ul>
		</div>
	);
};

export default Navigation;
