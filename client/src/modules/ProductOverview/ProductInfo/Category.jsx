import React from 'react'

export default function Category(props) {


  return (
    <div data-testid="categoryTest">
      {props.category.toUpperCase()}
    </div>
  )
}