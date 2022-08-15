import React, { useState, useEffect } from 'react'

export default function Gallery(props) {



  return (
    <img src={props.style.photos[0].url} style={{maxWidth: '50%'}}
         key={props.style.style_id}>
    </img>
  )
}