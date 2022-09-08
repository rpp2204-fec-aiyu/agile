import React from 'react'

export default function Title(props) {


  return (
    <div id='productTitle' data-testid="titleTest">
      <strong>{props.title}</strong>
    </div>
  )
}