import React, { useState } from 'react'

export default function Thumbnail(props) {

  return (
    <img src={props.src}
        //onClick={()=>props.handleClick(props.style, props.index)}
        width='75'
        height='75'
        style={{borderRadius: '50%', cursor:'pointer', objectFit: 'cover', border: '1px solid #000000'}}
        className='product-style_thumnbnail'
    />
  )
}