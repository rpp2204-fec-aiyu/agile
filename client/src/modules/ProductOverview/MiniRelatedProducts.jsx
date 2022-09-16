import React, { useState, useEffect} from 'react'
import axios from 'axios'

export default function MiniRelatedProducts(props) {

  function handleClick(productId) {
    console.log('CLICKEDDDD')
    props.setProductId(productId)

    axios.get(`/relatedProducts/${productId}`)
      .then(results => {
        console.log('PRODUCT THAT IS RELATED: ', results.data)
        props.setProduct(results.data)
      })
      .catch(err => console.log(err))
  }

  return (
    <div> -Related Products-
      <ul>
        {props.relatedProducts.map(product => (
          <li onClick={()=>handleClick(product)} style={{cursor: 'pointer'}} key={product}>{product}</li>
        ))}
      </ul>
    </div>
  )
}