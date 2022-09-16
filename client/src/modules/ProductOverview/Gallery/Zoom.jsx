import React, { useState, useEffect } from 'react'


export default function Zoom(props) {

  //let background = "url(" + props.galleryPhoto + ") no-repeat 0 0 fixed"
  let width = '1500px';
  let height = '800px';
  // if(props.naturalHeight > props.naturalWidth) {
  //    width = '800px'
  //    height = '1000px'
  // } else {
  //   width = '1000px'
  //   height = '800px'
  // }
  return (
    <div id='zoomContainer'
         onClick={props.expandView}
         style={{
           border: '3px solid black',
           //objectFit: 'cover',
           backgroundRepeat: 'no-repeat',
           //backgroundAttachment: 'fixed',
           //backgroundSize: 'cover',
           backgroundSize: `${props.naturalWidth * 2.5}px ${props.naturalHeight * 2.5}px`,
           backgroundImage: `url(${props.galleryPhoto})`,
           height: 'auto',
           //left: '0',
           minHeight: height,
           minWidth: width,
          //  marginLeft: 'auto',
          //  marginRight: 'auto',
           overflow: 'hidden',
           backgroundPosition: 'center',
           position: 'absolute',
           //top: '15px',
           width: '100%',
           zIndex: '10'
         }}
         >
      {/* <img  src={props.galleryPhoto} width='1750' height='1500' style={{objectFit: 'cover'}} /> */}
    </div>
  )
}