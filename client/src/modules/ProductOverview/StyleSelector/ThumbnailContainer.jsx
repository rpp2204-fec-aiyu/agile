import React, { useState } from 'react'

export default function ThumbnailContainer(props) {

  const [title, setTitle] = useState(props.styles[0].name)

  //let title = props.styles[0].name;

  // function handleClick(style) {
  //   console.log('CLICKED!!')
  //   title = style.name
  // }

  function handleClick(style) {
    setTitle(style.name)
    props.setStyle(style)
    if(style.sale_price) {
      props.setPrice(style.sale_price)
    } else {
      props.setPrice(style.original_price)
    }

  }



  return (
    <div>
      <h4><strong>Style > </strong>{title}</h4>
      {props.styles.map(style => (
        <img src={style.photos[0].thumbnail_url}
             onClick={()=>handleClick(style)} //was ()=>setTitle(style.name)
             width='75'
             height='75'
             style={{borderRadius: '50%'}}
             key={style.style_id}>
             </img> //style={{"pointer-events": "all"}}
      ))}
    </div>
  )
}