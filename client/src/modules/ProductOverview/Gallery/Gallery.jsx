import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import '../fontawesome.js'

export default function Gallery(props) {

  const [galleryPhoto, setGalleryPhoto] = useState(props.style.photos[0].url)
  const [imageHeight, setImageHeight] = useState(null)
  const [maxThumbnails, setMaxThumbnails] = useState(0)
  // const [highlighted, setHighlighted] = useState(false)
  const [highlightedThumbnail, setHighlightedThumbnail] = useState(0)

  const [lowIndex, setLowIndex] = useState(0)
  const [highIndex, setHighIndex] = useState(7)

  //let [border, setBorder] = useState('1px solid black')

  //let portrait = false;
  const [clientHeight, setClientHeight] = useState(null)
  const [clientWidth, setClientWidth] = useState(null)

  // let styling = {cursor: 'pointer', objectFit: 'cover'};

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
    console.log('width height', width, height)
    if(height > width) {
      setClientHeight('600')
      setClientWidth('700')
    } else {
      setClientHeight('600')
      setClientWidth('700')
      //console.log('PORTRAIT: ', portrait)
    }
  }

  getImgSize(galleryPhoto, getImgDimensions)

  function handleThumbnailClick(i, photo) {

    // return function handleClick(photo) {
    //   //let img = document.getElementById(`galleryThumbnail${i}`)
    //   //let img = document.getElementById('galleryMainImage')
    //   //console.log('url: ', photo)
    //   //console.log('NATURAL HEIGHT: ',img.naturalHeight)
    //   //console.log('NATURAL WIDTH: ', img.naturalWidth)
    //   // styling = {cursor: 'pointer', objectFit: 'cover', border: '15px solid black'}

    //   //let imageId = `galleryThumbnail${i}`
    //   //document.getElementById(imageId).style.border = "3px solid black";
    //   //setBorder('3px solid black')

    //   setGalleryPhoto(photo.url)
    //   setClicked(clicked === i ? null : i)
    // }

    setGalleryPhoto(photo.url)
    setHighlightedThumbnail(highlightedThumbnail === i ? null : i)

  }

  function mainImage(e, photo) {
    e.stopPropagation()
    setGalleryPhoto(photo)
  }

  useEffect(() => {
    setGalleryPhoto(props.style.photos[0].url)
  },[props.style])

  // let img;
  // let height;

  // useEffect(() => {
  //   img = document.getElementById('galleryMainImage')
  //   height = img.clientHeight
  //   setImageHeight(height)
  //   console.log('HEIGHT',height)
  //   console.log('WIDTH', img.clientWidth)
  // }, [])

  // useEffect(() => {
  //   img = document.getElementById('galleryMainImage')
  //   height = img.clientHeight
  //   setImageHeight(height)
  //   console.log('HEIGHT',height)
  //   console.log('WIDTH', img.clientWidth)
  // }, [galleryPhoto])

  // useEffect(()=> { //TODO: add condition for 6 thumbnails
  //   if(clientHeight === '467') {
  //     setMaxThumbnails(5)
  //   } else {
  //     setMaxThumbnails(7)
  //   }
  //   console.log('MAX THUMBNAILS: ', maxThumbnails)
  // }, [clientHeight])
  //width='300' height='200'

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
      //console.log('HIGH INDEX: ', highIndex)
      //let nextThumbnail = document.getElementById(`galleryThumbnail${highIndex}`)
      //setGalleryPhoto(nextThumbnail.dataset.photourl)
      setGalleryPhoto(props.style.photos[i].url)
      setHighlightedThumbnail(highlightedThumbnail + 1)
    } else {
      let nextThumbnail = document.getElementById(`galleryThumbnail${i + 1}`)
      setGalleryPhoto(nextThumbnail.dataset.photourl)
      setHighlightedThumbnail(highlightedThumbnail + 1)
    }

  }


  return (
    <div id='gallery' data-testid="galleryTest">
      <img id='galleryMainImage' src={galleryPhoto} width={clientWidth} height={clientHeight}  />
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
        {lowIndex === 0 ? <div><br/></div> : <FontAwesomeIcon icon='fa-solid fa-chevron-up' onClick={handleUpArrow} cursor={'pointer'}/> }

        {props.style.photos.map((photo, i) => {

          if(i >= lowIndex && i < highIndex) {
            return (
              <div onClick={()=>handleThumbnailClick(i, photo)} key={i}>

                {highlightedThumbnail === i ?
                  <img className='galleryThumbnail'
                    id={`galleryThumbnail${i}`}
                    data-photourl={photo.url}
                    src={photo.thumbnail_url}
                    style={{cursor: 'pointer', objectFit: 'cover', boxShadow: '3px 3px'}}
                    width='60' height='60'
                  /> :
                  <img className='galleryThumbnail'
                    id={`galleryThumbnail${i}`}
                    data-photourl={photo.url}
                    src={photo.thumbnail_url}
                    style={{cursor: 'pointer', objectFit: 'cover', border: '1px solid black'}}
                    width='60' height='60'
                  />
                }

              </div>
            )

          }
        })}
        {highIndex === props.style.photos.length ? <></> : <FontAwesomeIcon icon='fa-solid fa-chevron-down' onClick={handleDownArrow} cursor={'pointer'}/> }

      </div>
    </div>
  )

}