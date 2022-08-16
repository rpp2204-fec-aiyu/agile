import React, { useState, useEffect } from 'react'

export default function Gallery(props) {

  const [galleryPhoto, setGalleryPhoto] = useState(props.style.photos[0].url)

  function handleClick(photo) {
    setGalleryPhoto(photo)
  }

  useEffect(() => {
    setGalleryPhoto(props.style.photos[0].url)
  },[props.style])

  return (
    <div>
      <img src={galleryPhoto} style={{maxWidth: '50%'}}
          key={props.style.style_id}>
      </img>
      <br></br>
      {props.style.photos.map((photo, i) => (
        <img key={i} src={photo.thumbnail_url} onClick={()=>handleClick(photo.url)} width='75' height='75'></img>
      ))}
    </div>
  )
}