import React, { useState, useEffect } from 'react'

export default function Gallery(props) {



  return (
    <div>
      <img src={props.style.photos[0].url} style={{maxWidth: '50%'}}
          key={props.style.style_id}>
      </img>
      <br></br>
      {props.style.photos.map(photo => (
        <img src={photo.thumbnail_url} width='75' height='75'></img>
      ))}
    </div>
  )
}