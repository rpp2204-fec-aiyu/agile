import React, { useState } from 'react'

export default function Thumbnail(props) {

  return (
    <img src={props.src}
        onClick={()=>props.handleClick(props.style)}
        width='75'
        height='75'
        style={{borderRadius: '50%', cursor:'pointer', }}
        key={props.key}
        className='product-style_thumnbnail'
    />
  )
}