import React, { useEffect } from 'react';
import {useSelector} from 'react-redux'

const Photo = (props) => {
  // const statePhotos = useSelector((state) => state.photos);
  // useEffect(() => {
  //   //TODO rerender when photos update
  // }, [statePhotos])

  return (
    <img className="feed-photo" src={`https://s3.us-east-2.amazonaws.com/the-pass/${props.photo}`} alt="feed-photo" />
  )
}

export default Photo;
