import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Zoom from './Zoom.jsx'
import no_image_availabe from '../../../../assets/No_image_available.svg.png'

export default function Gallery(props) {

  const [galleryPhoto, setGalleryPhoto] = useState(props.style.photos[0].url)
  const [highlightedThumbnail, setHighlightedThumbnail] = useState(0)

  const [lowIndex, setLowIndex] = useState(0)
  const [highIndex, setHighIndex] = useState(7)

  const [clientWidth, setClientWidth] = useState('700')
  const [clientHeight, setClientHeight] = useState('600')

  const [galleryContainerWidth, setGalleryContainerWidth] = useState('700px')
  const [galleryContainerHeight, setGalleryContainerHeight] = useState('600px')

  const [naturalWidth, setNaturalWidth] = useState(0)
  const [naturalHeight, setNaturalHeight] = useState(0)
  const [isPortrait, setIsPortrait] = useState(false)

  const [isExpanded, setIsExpanded] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  function getImgSize(imgSrc, callback) {
    const newImg = new Image();

    newImg.onload = function() {
      const height = newImg.height;
      const width = newImg.width;
      callback({ width, height })
    }

    newImg.src = imgSrc;
  }

  function getImgDimensions({ width, height }) {
    setNaturalWidth(width)
    setNaturalHeight(height)
    if(height > width) {
      setIsPortrait(true)
    } else {
      setIsPortrait(false)
    }
  }

  useEffect(() => {
    if(props.style.photos.length === 0) {
      setGalleryPhoto(no_image_availabe)
    }
  }, [])

  useEffect(() => {
    let mainImg = document.getElementById('galleryMainImage')
    getImgSize(galleryPhoto, getImgDimensions)
    if(naturalHeight > naturalWidth) {
      mainImg.style.objectFit = 'contain';
      setIsPortrait(true)
    } else {
      mainImg.style.objectFit = 'cover';
      setIsPortrait(false)
    }
  })


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

  if(document.getElementById('zoomView')) {
    let zoom = document.getElementById('zoomView')
    zoom.addEventListener('mousemove', e => {
      let mousePosX = (e.pageX / window.innerWidth) * 100
      zoom.style.backgroundPositionX = mousePosX + '%'
      let mousePosY = (e.pageY / window.innerHeight) * 100
      zoom.style.backgroundPositionY = mousePosY + '%'
    })
  }

  function expandView() {
    let mainImg = document.getElementById('galleryMainImage')
    let gallery = document.getElementById('gallery')
    let galleryLeft = document.getElementById('galleryLeft')
    let galleryRight = document.getElementById('galleryRight')
    let thumbnailContainer = document.getElementsByClassName('galleryThumbnailContainer')[0]

    if(!isExpanded && !isZoomed) {

      props.setHideInfo(true)
      setIsExpanded(true)
      setClientWidth('1500')
      setClientHeight('800')
      setGalleryContainerWidth('1500px')
      setGalleryContainerHeight('800px')

      if(isPortrait) {
        mainImg.style.objectFit = 'contain';
      }
      else {
        mainImg.style.objectFit = 'cover';
      }
      gallery.style.backgroundColor = 'gray'
      thumbnailContainer.style.top  = '50px'
      thumbnailContainer.style.gap = '20px'
    } else if (isExpanded && !isZoomed) {
      setIsExpanded(false)
      setIsZoomed(true)
    }
    else {
      setIsZoomed(false)
      props.setHideInfo(false)

      mainImg.style.objectFit = 'cover';
      thumbnailContainer.style.top  = '10px'
      thumbnailContainer.style.gap = '10px'
      gallery.style.backgroundColor = 'lightgray'
      setClientWidth('700')
      setClientHeight('600')
      setGalleryContainerHeight('600px')
      setGalleryContainerWidth('700px')
    }
}



  return (

    <div id='gallery'
         data-testid="galleryTest"
         style={{backgroundColor: 'lightgray',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         position: 'relative',
         width: galleryContainerWidth,
         height: galleryContainerHeight}} >

        {isZoomed ?
          <Zoom
            expandView={expandView}
            galleryPhoto={galleryPhoto}
            naturalWidth={naturalWidth}
            naturalHeight={naturalHeight} />
            :
            null
        }


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
    </div>
  )
}