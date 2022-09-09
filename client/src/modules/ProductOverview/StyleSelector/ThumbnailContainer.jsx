import React, { useState } from 'react'
import Thumbnail from './Thumbnail.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ThumbnailContainer(props) {

  const [title, setTitle] = useState(props.styles[0].name)
  const [highlightedThumbnail, setHighlightedThumbnail] = useState(0)



  function handleClick(style, index) {
    setTitle(style.name)
    props.setStyle(style)

    props.setPrice(style.original_price)
    props.setSalePrice(style.sale_price)
    setHighlightedThumbnail(highlightedThumbnail === index ? null : index)
  }

  return (
    <div data-testid='thumbnailContainerTest'>
      <strong>STYLE > </strong>{title.toUpperCase()}
      <br/>
      <br/>
      <div id='stylesThumbnailContainer'>
      {props.styles.map((style, i)=> (
        <div onClick={()=>handleClick(style, i)} id='checkedStyleDiv'>
          {highlightedThumbnail === i ?
            <div>
              <FontAwesomeIcon icon="fa-solid fa-circle-check" id='styleCheckMark'/>
              <Thumbnail style={style}
                        index={i}
                        key={style.style_id}
                        //handleClick={handleClick}
                        src={style.photos[0].thumbnail_url}
              />
            </div>
            :
            <Thumbnail style={style}
                      index={i}
                      key={style.style_id}
                      //handleClick={handleClick}
                      src={style.photos[0].thumbnail_url}
            />
          }

        </div>
      ))}
      </div>
    </div>
  )
}