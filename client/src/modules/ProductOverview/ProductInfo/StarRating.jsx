import React from 'react'

export default function StarRating(props) {


  return (
    <div style={{display: 'flex', height: '20px'}}>
      {[...Array(5)].map(star => {
        return (<div>&#9733;</div>)
      })}
    </div>
  )
}