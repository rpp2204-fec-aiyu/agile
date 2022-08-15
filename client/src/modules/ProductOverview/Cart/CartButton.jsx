import React, { useState, useEffect } from 'react'

export default function CartButton(props) {
  const [cart, setCart] = useState([])

  function addItemToCart() {
    let cartItem = { style_id: props.style.style_id, size: props.size, quantitySelection: props.quantitySelection }
    setCart(prevCart => [...prevCart, cartItem] )
    console.log('CART ITEM ', cartItem)
    //console.log(cart)
  }

  useEffect(() => {
    console.log(cart)
  }, [cart])

  //if size not selected

  //if out of stock

  if(props.size && props.quantitySelection) {

    return (
      <button onClick={addItemToCart}>Add to Cart</button>
    )
  }

}