import React, {useState} from 'react';

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
      data.append('img', image)
    }
  }

  const handleChange = (e) => {

    const file = e.target.files[0]
    const fileReader = new FileReader()
    setImage(file);
    if (file) {
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        setImageurl(fileReader.result);
      }
    }
  }

  return (
    <div>
      {image ? <img src={imageurl} alt='userPhoto' style={{width: "300px", padding: "10px"}} /> : <p>Please upload a photo below</p>}
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleChange} />
        <button type="submit" className="login-submit">Submit</button>
      </form>
    </div>
  )
}

export default ImageUploadForm;
