import React, { useState } from 'react'
import Thumbnail from './Thumbnail.jsx'

export default function ThumbnailContainer(props) {

  const [title, setTitle] = useState(props.styles[0].name)

  function handleClick(style) {
    setTitle(style.name)
    props.setStyle(style)

    props.setPrice(style.original_price)
    props.setSalePrice(style.sale_price)
  }

  return (
    <div>
      <strong>STYLE > </strong>{title.toUpperCase()}
      <br/>
      <div style={{display: 'flex', flexWrap: 'wrap', width: '340px', gap: '10px' }}>
      {props.styles.map(style => (
        <Thumbnail style={style}
                   key={style.style_id}
                   handleClick={handleClick}
                   src={style.photos[0].thumbnail_url}
        />
      ))}
      </div>
    </div>
  )
}