import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Zoom from './Zoom.jsx'
// import '../fontawesome.js'

export default function Gallery(props) {

  const [galleryPhoto, setGalleryPhoto] = useState(props.style.photos[0].url)
  const [highlightedThumbnail, setHighlightedThumbnail] = useState(0)
  //const [isZoom, setIsZoom] = useState(false)

  const [lowIndex, setLowIndex] = useState(0)
  const [highIndex, setHighIndex] = useState(7)

  const [clientHeight, setClientHeight] = useState('600')
  const [clientWidth, setClientWidth] = useState('700')

  const [galleryContainerWidth, setGalleryContainerWidth] = useState('700px')
  const [galleryContainerHeight, setGalleryContainerHeight] = useState('600px')

  const [isExpanded, setIsExpanded] = useState(false)


  // useEffect(() => {
  //   let gallery = document.getElementById('gallery')
  //   gallery.addEventListener('onmousemove', e => {
  //     let mousePosX = (e.pageX/parseInt(galleryContainerWidth)) * 100;
  //     console.log('MOUSEPOSX: ', mousePosX)
  //     gallery.style.backgroundPositionX = mousePosX + '%'
  //     let mousePosY = (e.pageY/parseInt(galleryContainerHeight)) * 100;
  //     gallery.style.backgroundPositionY = mousePosY + '%'

  //   })
  // }, [])


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
    let mainImg = document.getElementById('galleryMainImage')
    let gallery = document.getElementById('gallery')
    let galleryLeft = document.getElementById('galleryLeft')
    let galleryRight = document.getElementById('galleryRight')
    let thumbnailContainer = document.getElementsByClassName('galleryThumbnailContainer')[0]
    if(clientWidth === '700') {
      props.setHideInfo(true)
      setIsExpanded(true)
      setClientWidth('1500')
      setClientHeight('800')
      setGalleryContainerWidth('1500px')
      setGalleryContainerHeight('800px')
      gallery.style.backgroundColor = 'gray'
      mainImg.style.objectFit = 'cover';
      gallery.style.zIndex = '10'
      //if(galleryLeft) galleryLeft.style.top = '700px'//(galleryContainerHeight / 2)  + 'px'
      //if(galleryRight) galleryRight.style.top = '700px' //(galleryContainerHeight / 2) + 'px'
      thumbnailContainer.style.zIndex = '10'
      thumbnailContainer.style.top  = '50px'
      thumbnailContainer.style.gap = '20px'
    }
    else {
      props.setHideInfo(false)
      setIsExpanded(false)
      mainImg.style.objectFit = 'cover';
      thumbnailContainer.style.top  = '10px'
      thumbnailContainer.style.gap = '10px'
      //if(galleryLeft) galleryLeft.style.top = '290px'
      //if(galleryRight) galleryRight.style.top = '290px'
      setClientWidth('700')
      setClientHeight('600')
      setGalleryContainerHeight('600px')
      setGalleryContainerWidth('700px')
    }
  }



  return (
    <div id='gallery' data-testid="galleryTest" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: galleryContainerWidth, height: galleryContainerHeight}} >

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
          style= {isExpanded ? {top: '380px'} : {top: '290px'}}
          onClick={()=>handleLeftArrow(highlightedThumbnail)}
        />
      }

      {highlightedThumbnail === props.style.photos.length - 1 ?
        null
        :
        <FontAwesomeIcon
          icon='fa-solid fa-circle-chevron-right'
          id='galleryRight'
          style= {isExpanded ? {top: '380px'} : {top: '290px'}}
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
      {/* {isZoom ? <Zoom galleryPhoto={galleryPhoto} /> : null} */}
    </div>
  )

}