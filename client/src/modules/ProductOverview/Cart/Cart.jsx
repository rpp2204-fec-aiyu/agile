import React, { useState, useEffect } from 'react'
import Size from './Size.jsx'
import Quantity from './Quantity.jsx'
import CartButton from './CartButton.jsx'

export default function Cart(props) {

  const [size, setSize] = useState(null)//useState(Object.entries(props.style.skus)[0][1].size)
  const [quantity, setQuantity] = useState(null)//useState(Object.entries(props.style.skus)[0][1].quantity)
  const [quantitySelection, setQuantitySelection] = useState(1)

  function handleSizeQuantity(style) {
    setSize(style.size)
    setQuantity(style.quantity)
  }

  useEffect(()=> {
    console.log(size, quantity, quantitySelection)
  }, [size, quantity, quantitySelection])

  return (
    <>
      <Size style={props.style} setStyle={props.setStyle} handleSizeQuantity={handleSizeQuantity}/>
      <Quantity quantity={quantity} size={size} setQuantitySelection={setQuantitySelection}/>
      <CartButton style={props.style} size={size} quantitySelection={quantitySelection} />
    </>
  )

}