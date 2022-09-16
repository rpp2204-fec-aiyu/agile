import React, { useState, useEffect } from 'react'


export default function Zoom(props) {

  //let background = "url(" + props.galleryPhoto + ") no-repeat 0 0 fixed"
  let width;
  let height;
  if(props.naturalHeight > props.naturalWidth) {
     width = '800px'
     height = '1000px'
  } else {
    width = '1000px'
    height = '800px'
  }
  return (
    <div id='zoomContainer'
         style={{
           border: '3px solid black',
           //objectFit: 'cover',
           backgroundRepeat: 'no-repeat',
           //backgroundAttachment: 'fixed',
           //backgroundSize: 'cover',
           backgroundSize: `${props.naturalWidth * 2.5}px ${props.naturalHeight * 2.5}px`,
           backgroundImage: `url(${props.galleryPhoto})`,
           //backgroundColor: 'red',
           height: 'auto',
           left: '0',
           minHeight: height,
           minWidth: width,
           overflow: 'hidden',
           //position: 'fixed',
           top: '1000',
           //width: '100%',
           //zIndex: '10'
         }}
         >
      {/* <img  src={props.galleryPhoto} width='1750' height='1500' style={{objectFit: 'cover'}} /> */}
    </div>
  )
}