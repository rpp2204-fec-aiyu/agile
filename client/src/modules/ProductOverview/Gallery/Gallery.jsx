import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import '../fontawesome.js'

export default function Gallery(props) {

  const [galleryPhoto, setGalleryPhoto] = useState(props.style.photos[0].url)
  const [highlightedThumbnail, setHighlightedThumbnail] = useState(0)

  const [lowIndex, setLowIndex] = useState(0)
  const [highIndex, setHighIndex] = useState(7)

  const [clientHeight, setClientHeight] = useState('600')
  const [clientWidth, setClientWidth] = useState('700')


  useEffect(() => {
    if(props.style.photos[highlightedThumbnail].url) {
      setGalleryPhoto(props.style.photos[highlightedThumbnail].url)
    } else {
      setGalleryPhoto(props.style.photos[0].url)
      setHighlightedThumbnail(0)
    }
  }, [props.style])

  function handleThumbnailClick(i, photo) {
    setGalleryPhoto(photo.url)
    setHighlightedThumbnail(i)
  }

  function handleDownArrow() {
    setLowIndex(lowIndex + 1)
    setHighIndex(highIndex + 1)
  }

  function handleUpArrow() {
    setLowIndex(lowIndex - 1)
    setHighIndex(highIndex - 1)
  }

  function handleLeftArrow(i) {
    if(i - 1 < lowIndex) {
      setLowIndex(lowIndex - 1)
      setHighIndex(highIndex - 1)
      i -= 1
      setGalleryPhoto(props.style.photos[i].url)
      setHighlightedThumbnail(highlightedThumbnail - 1)

    } else {
      let nextThumbnail = document.getElementById(`galleryThumbnail${i - 1}`)
      setGalleryPhoto(nextThumbnail.dataset.photourl)
      setHighlightedThumbnail(highlightedThumbnail - 1)
    }
  }

  function handleRightArrow(i) {
    if(i + 1 >= highIndex) {
      setLowIndex(lowIndex + 1)
      setHighIndex(highIndex + 1)
      i += 1
      setGalleryPhoto(props.style.photos[i].url)
      setHighlightedThumbnail(highlightedThumbnail + 1)
    } else {
      let nextThumbnail = document.getElementById(`galleryThumbnail${i + 1}`)
      setGalleryPhoto(nextThumbnail.dataset.photourl)
      setHighlightedThumbnail(highlightedThumbnail + 1)
    }
  }

  function expandView() {
    if(clientWidth === '700') {
      setClientWidth('900')
      setClientHeight('800')
    } else {
      setClientWidth('700')
      setClientHeight('600')
    }
  }


  return (
    <div id='gallery' data-testid="galleryTest">
      <img
        id='galleryMainImage'
        src={galleryPhoto}
        width={clientWidth}
        height={clientHeight}
        onClick={expandView}
      />
      {highlightedThumbnail === 0 ?
        null
        :
        <FontAwesomeIcon
          icon='fa-solid fa-circle-chevron-left'
          id='galleryLeft'
          cursor={'pointer'}
          onClick={()=>handleLeftArrow(highlightedThumbnail)}
        />
      }

      {highlightedThumbnail === props.style.photos.length - 1 ?
        null
        :
        <FontAwesomeIcon
          icon='fa-solid fa-circle-chevron-right'
          id='galleryRight'
          cursor={'pointer'}
          onClick={()=>handleRightArrow(highlightedThumbnail)}
        />
      }

      <br></br>

      <div className='galleryThumbnailContainer'>

        {lowIndex === 0 ?
          <div><br/></div>
          :
          <FontAwesomeIcon
            icon='fa-solid fa-chevron-up'
            onClick={handleUpArrow}
            cursor={'pointer'}
            fontSize='25px'/>
        }

        {props.style.photos.map((photo, i) => {

          if(i >= lowIndex && i < highIndex) {
            return (
              <div onClick={()=>handleThumbnailClick(i, photo)} key={i}>

                {highlightedThumbnail === i ?
                  <img className='galleryThumbnail'
                    id={`galleryThumbnail${i}`}
                    data-photourl={photo.url}
                    src={photo.thumbnail_url}
                    style={{cursor: 'pointer',
                            objectFit: 'cover',
                            boxShadow: '3px 3px orange'
                          }}
                    width='60' height='60'
                  /> :
                  <img className='galleryThumbnail'
                    id={`galleryThumbnail${i}`}
                    data-photourl={photo.url}
                    src={photo.thumbnail_url}
                    style={{cursor: 'pointer',
                            objectFit: 'cover',
                            border: '1px solid black'
                          }}
                    width='60' height='60'
                  />
                }

              </div>
            )

          }
        })}
        {highIndex >= props.style.photos.length ?
          <></>
          :
          <FontAwesomeIcon
            icon='fa-solid fa-chevron-down'
            onClick={handleDownArrow}
            cursor={'pointer'}
            fontSize='25px'/>
        }

      </div>
    </div>
  )

}