import React, { useState, useEffect } from 'react'


export default function Zoom(props) {


  return (
    <div id='zoomModalContainer' >
      <img  src={props.galleryPhoto} width='1750' height='1500' style={{objectFit: 'cover'}} />
    </div>
  )
}