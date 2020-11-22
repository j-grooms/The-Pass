import React, {useEffect, useState} from 'react';
import * as photoActions from "../../store/photos";
import {useDispatch, useSelector} from "react-redux";
import Photos from '../Photos'

const FeedContainer = () => {
  const dispatch = useDispatch();
  const [photos, setPhotos] = useState('');

  useEffect(() => {
    return dispatch(photoActions.getAllPhotos()).catch((res) => console.log("ERROR"));

  }, [])

  return (
    <div>
      <Photos />
    </div>
  )


}

export default FeedContainer;
