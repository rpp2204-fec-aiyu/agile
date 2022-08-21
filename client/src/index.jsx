import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
//TODO: Import Components

function App() {

  const getCurrentProduct = () => {
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