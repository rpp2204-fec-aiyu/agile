import React from 'react'

export default function Quantity(props) {

  //console.log('QUANTITY FROM PROPS: ', new Array(Number(props.quantity)))

  function getQuantitySelection(e) {
    let quantitySelection = e.target.value || 1;
    props.setQuantitySelection(quantitySelection)
  }


  //document.getElementById('quantitySelector').disabled = true;

  //must select size for quantity dropdown to be enabled
  if(props.size === 'selectsize' || props.size === null) {
    return (
      <label>Quantity:
        <select disabled>
          <option>-</option>
        </select>
      </label>
    )
  } else {

    //quantity to be capped at 15
    let limit;
    if(props.quantity > 15) {
      limit = 15
    } else {
      limit = Number(props.quantity)
    }

    return (
      <label>Quantity:
        <select id='quantitySelector' onChange={e=>getQuantitySelection(e)}>
          {Array.from(new Array(limit), (x, i) => i + 1).map((quantity, i) => (
            <option key={i}>{quantity}</option>
          ))}
        </select>

      </label>
    )
  }
}