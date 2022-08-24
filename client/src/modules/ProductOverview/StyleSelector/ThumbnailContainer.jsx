import React, { useState } from 'react'

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
      <h4><strong>Style > </strong>{title}</h4>
      <div style={{display: 'flex', flexWrap: 'wrap', width: '330px', gap: '10px' }}>
      {props.styles.map(style => (
        <img src={style.photos[0].thumbnail_url}
             onClick={()=>handleClick(style)}
             width='75'
             height='75'
             style={{borderRadius: '50%', cursor:'pointer', }}
             key={style.style_id}
             className='product-style_thumnbnail'
             >
             </img>
      ))}
      </div>
    </div>
  )
}