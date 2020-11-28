import {useSelector} from 'react-redux'
import { Redirect, Link } from 'react-router-dom';

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
        <Link className="splash-link" to="/login">Log In</Link>
        <Link className="splash-link" to="/signup">Sign me up!</Link>
      </div>
		</>
	);
}

export default SplashPage;
