require("dotenv").config()
const APIKEY = process.env.APIKEY
import React from 'react'
import renderer from 'react-test-renderer'
import axios from 'axios'
import ProductOverview from '../ProductOverview.jsx'

it('Renders ProductOverview component', () => {
  axios.get('/products', {headers: {'Authorization': APIKEY}})
    .then(products => {
      return products.data[4]
    })
    .then(product => {
      const component = renderer.create(<ProductOverview product={product} productId={product.id}/>)
      let tree = component.toJSON()
      expect(tree).toMatchSnapshot()

    })
})