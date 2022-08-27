import React, { useState, useEffect } from 'react'
import axios from 'axios'


export default function CartButton(props) {

  function addItemToCart() {
    axios.post('/cart', {
      sku_id: props.skuId
    } )
      .then(results => {
        console.log(results.data)
      })
  }

  //if size not selected

  //if out of stock

  if(props.size && props.quantitySelection) {

    return (
      <button onClick={addItemToCart}>Add to Cart +</button>
    )
  }

}