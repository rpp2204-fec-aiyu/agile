import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
//TODO: Import Components

function App() {

  const getCurrentProduct = () => {
    return axios.get('/products')
      .then(products => {
        console.log(products.data)
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
  }, [])



  if(!!productId) {
    //TODO: Add Components
    console.log(product, productId)
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