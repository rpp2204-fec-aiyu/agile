import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
//TODO: Import Components

function App() {

  const getCurrentProduct = () => {
    /* products.data[<index>]
    * 0: Camo Onesie Jacket
    * 1: Sunglasses
    * 2: Morning Joggers Pants
    * 3: Slackers Slacks Pants
    * 4: Heir Force Ones Shoes
    */
    return axios.get('/products')
      .then(products => {
        return products.data[4]
      })
  }

  const [product, setProduct] = useState(null)
  const [productId, setProductId] = useState(null)

  useEffect(() => {
    getCurrentProduct()
      .then(product => {
        setProduct(product)
        setProductId(product.id)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  if(!!productId) {
    //TODO: Add Components
    return (
      <>

      </>
    )
  } else {
    return (
      <></>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('app'))