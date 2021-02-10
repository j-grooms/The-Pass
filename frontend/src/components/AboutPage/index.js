import "./aboutPage.css";
import SplashPage from "../SplashPage"

const AboutPage = () => {
	return (
		<>
			<SplashPage />
			<p className="about-header">About This App</p>
			<div className="about-container">
				<p className="about-info">
					<span className="tab">The</span> Pass is a photo-sharing app for
					amateur and professional chefs. Share photos of your best work. Get
					feedback from other users. Find inspiration for your next dish.
				</p>
				<p className="about-info">
					<span className="tab">Before</span> starting out as a programmer I
					worked in kitchens, and really enjoyed the act of plating a dish. I am
					proud of this project, as I feel that it showcases what I have learned to date, while bringing in
					the passion I have for food presentation.
				</p>
				<p className="about-links">
					{" "}
					<span className="tab">For</span> more information about this project, check out{" "}
					<a
						className="github-link"
						href="https://github.com/j-grooms/The-Pass"
					>
						The Pass on Github.
					</a>
				</p>
				<div className="about-icons">
					<a href="https://github.com/j-grooms/">
						<i className="fab fa-github"></i>
					</a>
					<a href="https://www.linkedin.com/in/jacob-grooms/">
						<i className="fab fa-linkedin"></i>
					</a>
					<a href="https://angel.co/u/jacob-grooms">
						<i className="fab fa-angellist"></i>
					</a>
				</div>
			</div>
		</>
	);
};

export default AboutPage;
