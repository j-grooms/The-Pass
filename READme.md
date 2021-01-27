## The Pass

- [Link to live site](https://the-pass.herokuapp.com/)
- [Link to my github page](https://github.com/j-grooms)
### What We Are

The Pass is an app designed for chefs and cooking enthusiasts to share their work in one of the most important areas of cooking: the plating. They say people eat with their eyes first, and I have always found this to be true.

### Technologies Used

The Pass is built on two things: an API using Express and Sequelize to retrieve data from the database, and a front-end built on React and Redux for snappy loading and a single-page format.

On top of the those, I implemented multer for capturing the image on my server before uploading, as well as aws-sdk for actually uploading user files to a bucket. The photos are deleted after a successful upload to save on space. As a result, I only need to store the filename in my database, and I can simply interpolate it into the image tags to display it! This allows me to make the fastest queries to my database possible, and rely upon Amazon to do the heavy lifting of actually storing these potentially large files.

### Challenges Faced

The Amazon S3 integration took quite a while to get working fully. It was a brand new API to post to, and the rules for the S3 buckets and who can access them definitely took a while to fine tune using their dashboard. Overall, it was an enjoyable experience and I do believe that I learned a lot of valuable skills from it.

Redux as a whole was a difficult concept to grasp, because of all the moving parts. Once I was able to implement a few things with it, it clicked and became a lot easier to understand. Once the store is in place, with all the reducers hooked up, it was simple to make requests like this in my front-end.

```js
// components/FeedContainer
useEffect(() => {
	// dispatches custom action
	// this handles the API call in the reducer,
	// and sets the "photos" state to be the data returned from it
	return dispatch(photoActions.getAllPhotos());
}, [dispatch]);

// store/photos.js
// does fetch call and invokes action creator with payload
export const getAllPhotos = () => async (dispatch) => {
	const response = await fetch("/api/photos");
	dispatch(allPhotos(response.data));
	return response;
};

// these photos are persisted to the state,
// allowing app-wide access
```

The fundamentals also came into play a lot, such as this quick toggling function that I used for selecting tags

```js
// !dessert is the opposite of dessert, which is a true/false value
const [dessert, setDessert] = useState(false);
onChange={() => setDessert(!dessert)}
```

In addition, it was very easy to conditionally render groups or individual elements based on current state.

```js
// components/ImageUploadForm
{image ? (
		// Once image is selected, the tags will appear
		<fieldset className="tags-fieldset">
			<legend className="legend-text">
				Help others find your image! Select a tag (or more):
			</legend>
			{/*Removed for brevity*/}
		</fieldset> :
		<>
		{/*if no image, render nothing instead of tags*/}
		</>
	)
};
```
### The Future of The Pass
The Pass may have been built in just a week, but by no means does it stop there. In the future, I plan to implement:

- Albums
- Profile Pages
- Account/ Image deletion
- Comment deletion and editing
- Custom Tags and Tag Editing

Feel free to contact me on github with any and all questions!
