import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Zoom from './Zoom.jsx'
// import '../fontawesome.js'

export default function Gallery(props) {

  const [galleryPhoto, setGalleryPhoto] = useState(props.style.photos[0].url)
  const [highlightedThumbnail, setHighlightedThumbnail] = useState(0)
  const [isZoom, setIsZoom] = useState(false)

  const [lowIndex, setLowIndex] = useState(0)
  const [highIndex, setHighIndex] = useState(7)

  const [clientHeight, setClientHeight] = useState('600')
  const [clientWidth, setClientWidth] = useState('700')

  const [galleryContainerWidth, setGalleryContainerWidth] = useState('700px')
  const [galleryContainerHeight, setGalleryContainerHeight] = useState('600px')



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

    if(clientWidth === '700') {
      setClientWidth('900')
      setClientHeight('800')
      setGalleryContainerHeight('800px')
      setGalleryContainerWidth('900px')
    } else if (clientWidth === '900') {
      setIsZoom(true)

      let gallery = document.getElementById('gallery')
      let galleryImg = document.getElementById('galleryMainImage')

      gallery.style.background = `url(${galleryPhoto}) no-repeat`// 0 0 fixed`
      gallery.style.height = 'auto'
      gallery.style.left= '0'
      gallery.style.minHeight= '800px'
      gallery.style.minWidth= '900px'
      //gallery.style.position = 'fixed'
      gallery.style.top= '0'
      gallery.style.width= '100%'
      //gallery.style.objectFit = 'cover'
      gallery.addEventListener('mousemove', e => {
        let mousePosX = (e.pageX/parseInt(galleryContainerWidth)) * 100;
        console.log('MOUSEPOSX: ', mousePosX)
        gallery.style.backgroundPositionX = mousePosX + '%'
        let mousePosY = (e.pageY/parseInt(galleryContainerHeight)) * 100;
        gallery.style.backgroundPositionY = mousePosY + '%'
      })

      gallery.addEventListener('click', e => {
        setIsZoom(false)
      })

      //gallery.style = {overflow: 'hidden'}
      //gallery.style = {width: '900px', height: '800px'}
      setClientWidth((parseInt(clientWidth) * 2.5).toString())
      setClientHeight((parseInt(clientHeight) * 2.5).toString())
    } else {
      setIsZoom(false)
      setClientWidth('700')
      setClientHeight('600')
      setGalleryContainerHeight('600px')
      setGalleryContainerWidth('700px')
    }
  }



  return (
    <div id='gallery' data-testid="galleryTest" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: galleryContainerWidth, height: galleryContainerHeight}} >

      {isZoom ? null
      :
        <img
          id='galleryMainImage'
          src={galleryPhoto}
          width={clientWidth}
          height={clientHeight}
          onClick={expandView}
        />
      }


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
      {/* {isZoom ? <Zoom galleryPhoto={galleryPhoto} /> : null} */}
    </div>
  )

}