import "./aboutPage.css";

const AboutPage = () => {
	return (
		<>
			<p className="about-header">About This App</p>
			<div className="about-container">
				<p className="about-info">
					<span className="tab">The</span> Pass was developed as part of the
					curriculum at App Academy. Currently, everything you see was made in a
					one-week sprint to showcase React and Redux skills. As I really wanted
					to dive into photo uploading on this project, as it was something I
					have not had the chance to implement in previous projects. To
					accomplish this, I implemented an Amazon S3 bucket.
				</p>
				<p className="about-info">
					<span className="tab">Before</span> starting out as a programmer I
					worked in kitchens, and really enjoyed the act of plating a dish. I am
					proud of this project, as I feel that it accomplishes the goal I had
					for implementing an image upload to the cloud, as well as bringing in
					the passion I have for food presentation.
				</p>
				<p className="about-links">
					{" "}
					<span className="tab">For</span> more information about this project,
					as well as how to contact me, check out{" "}
					<a
						className="github-link"
						href="https://github.com/j-grooms/The-Pass"
					>
						The Pass on github
					</a>
					. While you are there, you can check out{" "}
					<a className="github-link" href="https://github.com/j-grooms">
						my personal github page
					</a>
					! Here you will find many of my projects, both solo and as part of a
					small team.
				</p>
			</div>
		</>
	);
};

export default AboutPage;
