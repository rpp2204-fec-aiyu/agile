import React from 'react'

export default function Price(props) {



  if(props.salePrice) {
    return (
      <>
      <div style={{color:'#FF0000'}}>Price: ${props.salePrice}</div><div><s>${props.price}</s></div>
      </>
    )
  } else {
    return(
      <div>
        Price: ${props.price}
      </div>
    )
  }

}