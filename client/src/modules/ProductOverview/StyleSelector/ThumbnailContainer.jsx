import React from 'react'

export default function ThumbnailContainer(props) {

  return (
    <div>
      {props.photos.map(photo => (
        <img src={photo}></img>
      ))}
    </div>
  )
}