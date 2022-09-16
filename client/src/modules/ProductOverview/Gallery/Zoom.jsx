import React, { useState, useEffect } from 'react'


export default function Zoom(props) {

  //let background = "url(" + props.galleryPhoto + ") no-repeat 0 0 fixed"
  return (
    <div id='zoomContainer'
         style={{
           border: '3px solid black',
           //objectFit: 'cover',
           backgroundRepeat: 'no-repeat',
           //backgroundAttachment: 'fixed',
           backgroundImage: `url(${props.galleryPhoto})`,
           //backgroundColor: 'red',
           height: 'auto',
           left: '0',
           minHeight: '800px',
           minWidth: '900px',
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