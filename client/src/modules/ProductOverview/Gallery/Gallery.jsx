import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import '../fontawesome.js'

export default function Gallery(props) {

  const [galleryPhoto, setGalleryPhoto] = useState(props.style.photos[0].url)
  //const [imageHeight, setImageHeight] = useState(null)
  const [maxThumbnails, setMaxThumbnails] = useState(0)

  let [lowIndex, setLowIndex] = useState(0)
  let [highIndex, setHighIndex] = useState(7)

  //let portrait = false;
  const [clientHeight, setClientHeight] = useState(null)
  const [clientWidth, setClientWidth] = useState(null)

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


  function handleClick(e, photo, i) {
    //let img = document.getElementById(`galleryThumbnail${i}`)
    let img = document.getElementById('galleryMainImage')
    //console.log('url: ', photo)
    console.log('NATURAL HEIGHT: ',img.naturalHeight)
    console.log('NATURAL WIDTH: ', img.naturalWidth)

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

  useEffect(()=> { //TODO: add condition for 6 thumbnails
    if(clientHeight === '467') {
      setMaxThumbnails(5)
    } else {
      setMaxThumbnails(7)
    }
    console.log('MAX THUMBNAILS: ', maxThumbnails)
  }, [clientHeight])
  //width='300' height='200'

  function handleDownArrow() {
    setLowIndex(lowIndex += 1)
    setHighIndex(highIndex += 1)
  }

  function handleUpArrow() {
    setLowIndex(lowIndex -= 1)
    setHighIndex(highIndex -= 1)
  }


  return (
    <div id='gallery' data-testid="galleryTest">
      <img id='galleryMainImage' src={galleryPhoto} width={clientWidth} height={clientHeight}  />
      {/* key={props.style.style_id}> */}
      <br></br>

      <div className='galleryThumbnailContainer'>
      {lowIndex === 0 ? <div><br/></div> : <FontAwesomeIcon icon='fa-solid fa-chevron-up' onClick={handleUpArrow} cursor={'pointer'}/> }

      {/* <i class='fa-solid fa-angle-up'></i> */}
        {props.style.photos.map((photo, i) => {
          console.log(i)
          if(i >= lowIndex && i < highIndex) {
            return (
            <img className='galleryThumbnail' id={`galleryThumbnail${i}`} key={i} src={photo.thumbnail_url} onClick={(e)=>handleClick(e, photo.url, i)} style={{cursor: 'pointer', objectFit: 'cover'}} width='60' height='60' ></img>
            )
            // i++;
          }
        })}
        {highIndex === props.style.photos.length - 1 ? <div><br/></div> : <FontAwesomeIcon icon='fa-solid fa-chevron-down' onClick={handleDownArrow} cursor={'pointer'}/> }

      </div>
    </div>
  )

}