import React from 'react'
import axios from 'axios'
import ThumbnailContainer from './ThumbnailContainer.jsx'

export default function StyleSelector(props) {

  return (
    <>
      <ThumbnailContainer styles={props.styles} setStyle={props.setStyle} setPrice={props.setPrice} setSalePrice={props.setSalePrice}/>
    </>
  )

}