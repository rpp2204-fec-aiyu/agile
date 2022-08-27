import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import '../dist/styles.css';
//TODO: Import Components
import ProductOverview from './modules/ProductOverview/ProductOverview.jsx'
import RatingsAndReviews from './modules/RatingsReviews/ratingsAndReviews.jsx'
import QuesAns from './modules/QuestionsAnswers/QuesAns.jsx'
import RelatedProducts from './modules/RelatedProducts/RelatedProducts.jsx'

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
    return (
      <>

        <ProductOverview product={product} productId={productId}/>
        <RelatedProducts />
        <RatingsAndReviews product_id={71697}/>
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