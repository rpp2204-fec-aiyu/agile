import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Category from './ProductInfo/Category.jsx'
import Title from './ProductInfo/Title.jsx'
import Price from './ProductInfo/Price.jsx'
import Overview from './ProductInfo/Overview.jsx'
import MyOutfitButton from './ProductInfo/MyOutfitButton.jsx'
import StyleSelector from './StyleSelector/StyleSelector.jsx'
import Cart from './Cart/Cart.jsx'

import Gallery from './Gallery/Gallery.jsx'

//TODO: Get product features from product_id query to API
export default function ProductOverview({ product, productId }) {

  // function getCurrentProduct() {
  //   return axios.get('http://localhost:3000/products')
  //     .then(results => {
  //       console.log('CURRENT PRODUCT: ', results.data)
  //       return results.data
  //     })
  //     .then(result => {
  //       return result[0]
  //     })
  // }

  function getCurrentProductStyles(id) { //Refactor to get features and then styles
    return axios.get(`/products/${id}/styles`) //changes endpoint to include styles
      .then(results => {
        return results.data.results
    })
  }

  const [currentProduct, setCurrentProduct] = useState(product)
  const [category, setCategory] = useState(product.category)
  const [title, setTitle] = useState(product.name)
  const [price, setPrice] = useState(product.price)
  const [slogan, setSlogan] = useState(product.slogan)
  const [description, setDescription] = useState(product.description)
  const [id, setId] = useState(productId)

  const [styles, setStyles] = useState([])
  const [style, setStyle] = useState(null)
  const [salePrice, setSalePrice] = useState(null)
  //const [isOnSale, setIsOnSale] = useState(null)

  useEffect(()=> {
    // getCurrentProduct()
    //   .then(product => {
    //     setCurrentProduct(product)
    //     setCategory(product.category)
    //     setTitle(product.name)
    //     setPrice(product.default_price)
    //     setSlogan(product.slogan)
    //     setDescription(product.description)
    //     setId(product.id)

    getCurrentProductStyles(id)
      .then(styles => {
        console.log("STYLES FROM GET REQ: ", styles)
        setStyles(styles)
        setStyle(styles[0])
        setSalePrice(styles[0].sale_price)
        //if(style)
        //setIsOnSale(style.sale_price)
      })
    //})
  }, [])

  if(style) {
    return (
      <div>
        <Category category={category} />
        <Title title={title} />
        <Price price={price} salePrice={salePrice} />
        <Overview slogan={slogan} description={description} />
        <MyOutfitButton />

        <StyleSelector styles={styles} setStyle={setStyle} setPrice={setPrice} setSalePrice={setSalePrice} />

        <Cart style={style} setStyle={setStyle} />
        <br></br>
        <Gallery style={style} />
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}