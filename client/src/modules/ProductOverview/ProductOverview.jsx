import React from 'react'
import axios from 'axios'
import Category from './ProductInfo/Category.jsx'
import Title from './ProductInfo/Title.jsx'
import Price from './ProductInfo/Price.jsx'
import Overview from './ProductInfo/Overview.jsx'
import MyOutfit from './ProductInfo/MyOutfit.jsx'
import StyleSelector from './StyleSelector/StyleSelector.jsx'

export default class ProductOverview extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentProduct: {
        category: null,
        name: null,
        default_price: null,
        slogan: null,
        description: null,
        id: null
      }
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/products')
      .then(results => {
        console.log(results.data)
        this.setState({
          currentProduct: results.data[3]
        }, () => console.log(this.state.currentProduct))
      })
  }

  render() {
    return (
      <div>
        <Category category={this.state.currentProduct.category} />
        <Title title={this.state.currentProduct.name} />
        <Price price={this.state.currentProduct.default_price} />
        <Overview slogan={this.state.currentProduct.slogan} description={this.state.currentProduct.description} />
        <MyOutfit />

        {this.state.currentProduct.id ? <StyleSelector id={this.state.currentProduct.id}/> : null}
      </div>
    )
  }
}