import React, { useEffect } from 'react';
import {useSelector} from 'react-redux'

const Photos = (props) => {
  const statePhotos = useSelector((state) => state.photos);
  useEffect(() => {
    //TODO rerender when photos update
  }, [statePhotos])

  return (<div>
    {
      console.log("HERE!!!!", statePhotos)

    }
  </div>)
}

export default Photos;
