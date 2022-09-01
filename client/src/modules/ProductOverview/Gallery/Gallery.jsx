import React, { useState, useEffect } from 'react'

export default function Gallery(props) {

  const [galleryPhoto, setGalleryPhoto] = useState(props.style.photos[0].url)
  const [imageHeight, setImageHeight] = useState(null)

  function handleClick(photo) {
    setGalleryPhoto(photo)
  }

  useEffect(() => {
    setGalleryPhoto(props.style.photos[0].url)
  },[props.style])

  let img;
  let height;

  useEffect(() => {
    img = document.getElementById('galleryMainImage')
    height = img.clientHeight
    setImageHeight(height)
    console.log('HEIGHT',height)
  }, [])

  useEffect(() => {
    img = document.getElementById('galleryMainImage')
    height = img.clientHeight
    setImageHeight(height)
    console.log('HEIGHT',height)
  }, [galleryPhoto])


  return (
    <div id='gallery'>
      <img id='galleryMainImage' src={galleryPhoto} />
      {/* key={props.style.style_id}> */}
      <br></br>
      <div className='galleryThumbnailContainer'>
        {props.style.photos.map((photo, i) => (
          <img className='galleryThumbnail' key={i} src={photo.thumbnail_url} onClick={()=>handleClick(photo.url)} style={{cursor: 'pointer', objectFit: 'cover'}} width='60' height='60' ></img>
        ))}
      </div>
    </div>
  )
}