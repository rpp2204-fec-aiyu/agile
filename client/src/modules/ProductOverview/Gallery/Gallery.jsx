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
    <div className='gallery'>
      <img className='galleryMainImage' src={galleryPhoto} //style={{maxWidth: '50%'}}
          key={props.style.style_id}>
      </img>
      <br></br>
      <div className='galleryThumbnailContainer'>
        {props.style.photos.map((photo, i) => (
          <img className='galleryThumbnail' key={i} src={photo.thumbnail_url} onClick={()=>handleClick(photo.url)} style={{cursor: 'pointer', objectFit: 'cover'}} width='75' height='75' ></img>
        ))}
      </div>
    </div>
  )
}