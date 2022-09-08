import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import '../fontawesome.js'

export default function Gallery(props) {

  const [galleryPhoto, setGalleryPhoto] = useState(props.style.photos[0].url)
  const [imageHeight, setImageHeight] = useState(null)
  const [maxThumbnails, setMaxThumbnails] = useState(0)
  // const [highlighted, setHighlighted] = useState(false)
  const [clicked, setClicked] = useState(null)

  let [lowIndex, setLowIndex] = useState(0)
  let [highIndex, setHighIndex] = useState(7)

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
    setClicked(clicked === i ? null : i)

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
    setLowIndex(lowIndex += 1)
    setHighIndex(highIndex += 1)
  }

  function handleUpArrow() {
    setLowIndex(lowIndex -= 1)
    setHighIndex(highIndex -= 1)
  }

  function handleRightArrow() {
    let nextThumbnail = document.getElementById(`galleryThumbnail${i + 1}`)
    setGalleryPhoto(nextThumbnail.url)
  }


  return (
    <div id='gallery' data-testid="galleryTest">
      <img id='galleryMainImage' src={galleryPhoto} width={clientWidth} height={clientHeight}  />
      <FontAwesomeIcon icon='fa-solid fa-circle-chevron-left' id='galleryLeft' cursor={'pointer'} />
      <FontAwesomeIcon icon='fa-solid fa-circle-chevron-right' id='galleryRight' cursor={'pointer'} />
      {/* key={props.style.style_id}> */}
      <br></br>

      <div className='galleryThumbnailContainer'>
        {lowIndex === 0 ? <div><br/></div> : <FontAwesomeIcon icon='fa-solid fa-chevron-up' onClick={handleUpArrow} cursor={'pointer'}/> }

      {/* <i class='fa-solid fa-angle-up'></i> */}
        {props.style.photos.map((photo, i) => {

          if(i >= lowIndex && i < highIndex) {
            return (
              <div onClick={()=>handleThumbnailClick(i, photo)} key={i}>
                {clicked === i ?
                  <img className='galleryThumbnail'
                    id={`galleryThumbnail${i}`}
                    //key={i}
                    src={photo.thumbnail_url}
                    //onClick={()=>mainImage(photo)}
                    style={{cursor: 'pointer', objectFit: 'cover', boxShadow: '3px 3px'}}
                    width='60' height='60'
                  /> :
                  <img className='galleryThumbnail'
                    id={`galleryThumbnail${i}`}
                    //key={i}
                    src={photo.thumbnail_url}
                    //onClick={()=>click(i)(photo)}
                    style={{cursor: 'pointer', objectFit: 'cover', border: '1px solid black'}}
                    width='60' height='60'
                  />
                }

              </div>
            )

          }
        })}
        {highIndex === props.style.photos.length - 1 ? <></> : <FontAwesomeIcon icon='fa-solid fa-chevron-down' onClick={handleDownArrow} cursor={'pointer'}/> }

      </div>
    </div>
  )

}