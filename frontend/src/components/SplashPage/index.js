import {useSelector} from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';

import "./splashPage.css"

const SplashPage = () => {
  const currentUser = useSelector((state) => state.session.user);
  if (currentUser) return <Redirect to="/feed" />
  return (
		<>
      <div className="splash-div">
        <p className="splash-title">Welcome to The Pass. Where the Art of Plating comes to life.</p>
        <p className="splash-subtitle">To get started, select an option below.</p>
      </div>
      <div className="splash-links">
        <NavLink activeClassName="active-link" className="splash-link" to="/login">Log In</NavLink>
        <NavLink activeClassName="active-link" className="splash-link" to="/signup">Sign me up!</NavLink>
      </div>
		</>
	);
}

export default SplashPage;
