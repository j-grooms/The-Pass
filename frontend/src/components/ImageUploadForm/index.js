import React, {useState} from 'react';
import { fetch } from '../../store/csrf'

const ImageUploadForm = () => {
  const [image, setImage] = useState('');
  const [imageurl, setImageurl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(image)
    // attach this to the body, no need to stringify
    // Content-Type: <for images>
    const data = new FormData();
    if (image) {
    }
    // data.append('img', image)
    data['img'] = image
    console.log(data)
    submitS3(data);
  }

  const submitS3 = async(data) => {
    const res = await fetch("api/s3/post_file", {
			method: "POST",
			headers: { "Content-Type" : "image/*" },
			body:{data} ,
		});
  }

  const handleChange = (e) => {

    const file = e.target.files[0]
    const fileReader = new FileReader()
    setImage(file);
    console.log(image)
    if (file) {
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        setImageurl(fileReader.result);
      }
    }
  }

  const getLobstah = async(e) => {
    e.preventDefault()
    const res = await fetch('api/s3/get_file/lobstah')
  }

  return (
		<div>
			{image ? (
				<img
					src={imageurl}
					alt="userPhoto"
					style={{ width: "300px", padding: "10px" }}
				/>
			) : (
				<p>Please upload a photo below</p>
			)}
			<form
        encType="multipart/form-data"
        onSubmit = { handleSubmit }
			>
				<input type="file" accept="image/*" onChange={handleChange} />
				<button type="submit" className="login-submit">
					Submit
				</button>
			</form>
      <button onClick={getLobstah} className="login-submit" >LOBSTAH</button>
		</div>
	);
}

export default ImageUploadForm;
