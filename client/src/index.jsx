import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
//TODO: Import Components
import QuesAns from './QuestionAnswer/QuesAns.jsx'

function App() {

  const getCurrentProduct = () => {
    /* products.data[<index>]
    * 0: Camo Onesie Jacket     id: 71697
    * 1: Sunglasses             id: 71698
    * 2: Morning Joggers Pants  id: 71699
    * 3: Slackers Slacks Pants  id: 71700
    * 4: Heir Force Ones Shoes  id: 71701
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
        <QuesAns />
      </>
    )
  } else {
    return (
      <></>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('app'))