import React from 'react'

export default function Overview(props) {


  return (
    <div>
      Slogan: {props.slogan}
      <p>
      Description: {props.description}
      </p>
    </div>
  )
}