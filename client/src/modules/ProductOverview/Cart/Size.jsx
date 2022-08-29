import React, { useState } from 'react'

export default function Size(props) {

  //TODO if no quantities, dropdown should be disabled and read 'out of stock'
  let inStock = Object.entries(props.style.skus).filter(sku => sku[1].quantity > 0).length;
  if(!inStock) {
    return (
      <label>Size:
        <select disabled>
          <option>Out Of Stock</option>
        </select>
      </label>
    )
  } else {
    return (
      <label>Size:
        <select id='sizeSelector' onChange={(e)=>props.handleSizeQuantity(
            {
              size: e.target.value,
              quantity: e.target.selectedOptions[0].dataset.quantity,
              skuId: e.target.selectedOptions[0].dataset.skuid
            }
          )}>

          <option value='selectsize'>Select Size</option>
          {Object.entries(props.style.skus).filter(sku => sku[1].quantity > 0).map((sku, i) => (  //check quantity > 0
            <option data-quantity={sku[1].quantity} data-skuid={sku[0]} key={i}>{sku[1].size}</option>
          ))}

        </select>

      </label>
    )
  }


}