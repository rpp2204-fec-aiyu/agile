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


export default function ProductOverview() {

  function getCurrentProduct() {
    return axios.get('http://localhost:3000/products')
      .then(results => {
        console.log('CURRENT PRODUCT: ', results.data)
        return results.data
      })
      .then(result => {
        return result[0]
      })
  }

  function getCurrentProductStyles(id) {
    return axios.get(`/products/${id}`)
      .then(results => {
        return results.data.results
    })
  }

  const [currentProduct, setCurrentProduct] = useState(null)
  const [category, setCategory] = useState(null)
  const [title, setTitle] = useState(null)
  const [price, setPrice] = useState(null)
  const [slogan, setSlogan] = useState(null)
  const [description, setDescription] = useState(null)
  const [id, setId] = useState(null)

  const [styles, setStyles] = useState([])
  const [style, setStyle] = useState(null)

  useEffect(()=> {
    getCurrentProduct()
      .then(product => {
        setCurrentProduct(product)
        setCategory(product.category)
        setTitle(product.name)
        setPrice(product.default_price)
        setSlogan(product.slogan)
        setDescription(product.description)
        setId(product.id)

        getCurrentProductStyles(product.id)
          .then(styles => {
            console.log("STYLES FROM GET REQ: ", styles)
            setStyles(styles)
            setStyle(styles[0])
          })
      })
  }, [])

  if(style) {
    return (
      <div>
        <Category category={category} />
        <Title title={title} />
        <Price price={price} />
        <Overview slogan={slogan} description={description} />
        <MyOutfitButton />

        <StyleSelector styles={styles} setStyle={setStyle} setPrice={setPrice} />

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







// export default class ProductOverview extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       currentProduct: {
//         category: null,
//         name: null,
//         default_price: null,
//         slogan: null,
//         description: null,
//         id: null
//       }
//     }
//   }

//   componentDidMount() {
//     axios.get('http://localhost:3000/products')
//       .then(results => {
//         console.log(results.data)
//         this.setState({
//           currentProduct: results.data[3]
//         }, () => console.log(this.state.currentProduct))
//       })
//   }

//   render() {
//     return (
//       <div>
//         <Category category={this.state.currentProduct.category} />
//         <Title title={this.state.currentProduct.name} />
//         <Price price={this.state.currentProduct.default_price} />
//         <Overview slogan={this.state.currentProduct.slogan} description={this.state.currentProduct.description} />
//         <MyOutfit />

//         {this.state.currentProduct.id ? <StyleSelector id={this.state.currentProduct.id}/> : null}
//       </div>
//     )
//   }
// }