/**
 * @jest-environment jsdom
 */

import ReactDOM from 'react-dom'
import React from 'react';
import '@testing-library/jest-dom'
import {render, fireEvent, screen, cleanup} from '@testing-library/react'
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Gallery from '../Gallery/Gallery.jsx'
import Category from '../ProductInfo/Category.jsx'
import Overview from '../ProductInfo/Overview.jsx'
import Price from '../ProductInfo/Price.jsx'
import Title from '../ProductInfo/Title.jsx'
import ThumbnailContainer from '../StyleSelector/ThumbnailContainer.jsx'
import ProductOverview from '../ProductOverview.jsx'

// it('Renders ProductOverview component', () => {
//   axios.get('/products', {headers: {'Authorization': APIKEY}})
//     .then(products => {
//       return products.data[4]
//     })
//     .then(product => {
//       const component = renderer.create(<ProductOverview product={product} productId={product.id}/>)
//       let tree = component.toJSON()
//       expect(tree).toMatchSnapshot()

//     })
// })

const server = setupServer(
  rest.get('/productOverview/:product_id', (req, res, ctx) => {
    return res(
      ctx.json({
        features: [{feature: 'Sole', value: 'Rubber'}, {feature: 'Material', value: 'FullControlSkin'}],
        reviews: {1: '2', 2: '14', 3: '2', 4: '8', 5: '3'},
        styles: [{
          "default?" : true,
          name: 'White & White',
          original_price: '99.00',
          photos: [{
            "thumbnail_url": "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
            "url": "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
          }, {
            "thumbnail_url": "https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
            "url": "https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
          }],
          sale_price: null,
          skus: {
            "2580652": {
              "quantity": 14,
              "size": "7"
            },
            "2580653": {
              "quantity": 25,
              "size": "7.5"
            },
            "2580654": {
              "quantity": 9,
              "size": "8"
            },
            "2580655": {
              "quantity": 2,
              "size": "8.5"
            },
            "2580656": {
              "quantity": 18,
              "size": "9"
            },
            "2580657": {
              "quantity": 12,
              "size": "9.5"
            },
            "2580658": {
              "quantity": 10,
              "size": "10"
            },
            "2580659": {
              "quantity": 18,
              "size": "10.5"
            },
            "2580660": {
              "quantity": 11,
              "size": "11"
            },
            "2580661": {
              "quantity": 35,
              "size": "11.5"
            },
            "2580662": {
              "quantity": 25,
              "size": "12"
            }
          },
          style_id: 444243
        },
        {
          "style_id": 444244,
          "name": "White & Red",
          "original_price": "99.00",
          "sale_price": null,
          "default?": false,
          "photos": [
            {
              "thumbnail_url": "https://images.unsplash.com/photo-1542280756-74b2f55e73ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1542280756-74b2f55e73ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
            },
            {
              "thumbnail_url": "https://images.unsplash.com/photo-1521093470119-a3acdc43374a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1521093470119-a3acdc43374a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
            },
            {
              "thumbnail_url": "https://images.unsplash.com/photo-1474494819794-90f9664b530d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1474494819794-90f9664b530d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80"
            },
            {
              "thumbnail_url": "https://images.unsplash.com/photo-1465877783223-4eba513e27c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1465877783223-4eba513e27c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
            },
            {
              "thumbnail_url": "https://images.unsplash.com/photo-1428790031246-698d71b6fe3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1428790031246-698d71b6fe3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
            },
            {
              "thumbnail_url": "https://images.unsplash.com/photo-1470282312847-28b943046dc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1470282312847-28b943046dc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1652&q=80"
            },
            {
              "thumbnail_url": "https://images.unsplash.com/photo-1428790067070-0ebf4418d9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1428790067070-0ebf4418d9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
            },
            {
              "thumbnail_url": "https://images.unsplash.com/photo-1451256656121-9ffc0c898a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1451256656121-9ffc0c898a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
            },
            {
              "thumbnail_url": "https://images.unsplash.com/photo-1524604519054-2365ac11e431?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1524604519054-2365ac11e431?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
            },
            {
              "thumbnail_url": "https://images.unsplash.com/photo-1541006008768-d181e7f9f3d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1541006008768-d181e7f9f3d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1568&q=80"
            },
            {
              "thumbnail_url": "https://images.unsplash.com/photo-1430390456011-25ac9244999c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1430390456011-25ac9244999c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
            }
          ],
          "skus": {
            "2580663": {
              "quantity": 14,
              "size": "7"
            },
            "2580664": {
              "quantity": 25,
              "size": "7.5"
            },
            "2580665": {
              "quantity": 9,
              "size": "8"
            },
            "2580666": {
              "quantity": 2,
              "size": "8.5"
            },
            "2580667": {
              "quantity": 18,
              "size": "9"
            },
            "2580668": {
              "quantity": 12,
              "size": "9.5"
            },
            "2580669": {
              "quantity": 10,
              "size": "10"
            },
            "2580670": {
              "quantity": 18,
              "size": "10.5"
            },
            "2580671": {
              "quantity": 11,
              "size": "11"
            },
            "2580672": {
              "quantity": 35,
              "size": "11.5"
            },
            "2580673": {
              "quantity": 25,
              "size": "12"
            }
          }
        }
      ]
      })
    )
  })
)

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe.only('Product Overview', () => {
  // it('should render ProductOverview Component', () => {
  //   render(<ProductOverview product='Heir Force Ones' productId={71701}/>)
  //   expect(screen.getByTestId('productOverviewTest')).toBeInTheDocument();
  // })
  it('should render Gallery Component', () => {
    render(<Gallery style={{
      "default?" : true,
      name: 'White & White',
      original_price: '99.00',
      photos: [{
        "thumbnail_url": "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
        "url": "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
      }, {
        "thumbnail_url": "https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
        "url": "https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
      }],
      sale_price: null,
      skus: {
        "2580652": {
          "quantity": 14,
          "size": "7"
        },
        "2580653": {
          "quantity": 25,
          "size": "7.5"
        },
        "2580654": {
          "quantity": 9,
          "size": "8"
        },
        "2580655": {
          "quantity": 2,
          "size": "8.5"
        },
        "2580656": {
          "quantity": 18,
          "size": "9"
        },
        "2580657": {
          "quantity": 12,
          "size": "9.5"
        },
        "2580658": {
          "quantity": 10,
          "size": "10"
        },
        "2580659": {
          "quantity": 18,
          "size": "10.5"
        },
        "2580660": {
          "quantity": 11,
          "size": "11"
        },
        "2580661": {
          "quantity": 35,
          "size": "11.5"
        },
        "2580662": {
          "quantity": 25,
          "size": "12"
        }
      },
      style_id: 444243
    }} />)
    expect(screen.getByTestId('galleryTest')).toBeInTheDocument();
  })
  it('should render Category Component', () => {
    render(<Category category="Jackets" />)
    expect(screen.getByTestId('categoryTest')).toBeInTheDocument();
  })
  it('should render Overview Component', () => {
    render(<Overview slogan="slogan" description="description" features={['feature1', 'feature2', 'feature3']} />)
    expect(screen.getByTestId('overviewTest')).toBeInTheDocument();
  })
  it('should render Price Component', () => {
    render(<Price price="99.00" />)
    expect(screen.getByTestId('priceTest')).toBeInTheDocument();
  })
  it('should render Title Component', () => {
    render(<Title title="title" />)
    expect(screen.getByTestId('titleTest')).toBeInTheDocument();
  })
  it('should render ThumbnailContainer Component', () => {
    render(<ThumbnailContainer styles={
      [{
        "default?" : true,
        name: 'White & White',
        original_price: '99.00',
        photos: [{
          "thumbnail_url": "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
        }, {
          "thumbnail_url": "https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
        }],
        sale_price: null,
        skus: {
          "2580652": {
            "quantity": 14,
            "size": "7"
          },
          "2580653": {
            "quantity": 25,
            "size": "7.5"
          },
          "2580654": {
            "quantity": 9,
            "size": "8"
          },
          "2580655": {
            "quantity": 2,
            "size": "8.5"
          },
          "2580656": {
            "quantity": 18,
            "size": "9"
          },
          "2580657": {
            "quantity": 12,
            "size": "9.5"
          },
          "2580658": {
            "quantity": 10,
            "size": "10"
          },
          "2580659": {
            "quantity": 18,
            "size": "10.5"
          },
          "2580660": {
            "quantity": 11,
            "size": "11"
          },
          "2580661": {
            "quantity": 35,
            "size": "11.5"
          },
          "2580662": {
            "quantity": 25,
            "size": "12"
          }
        },
        style_id: 444243
      },
      {
        "style_id": 444244,
        "name": "White & Red",
        "original_price": "99.00",
        "sale_price": null,
        "default?": false,
        "photos": [
          {
            "thumbnail_url": "https://images.unsplash.com/photo-1542280756-74b2f55e73ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
            "url": "https://images.unsplash.com/photo-1542280756-74b2f55e73ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
          },
          {
            "thumbnail_url": "https://images.unsplash.com/photo-1521093470119-a3acdc43374a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
            "url": "https://images.unsplash.com/photo-1521093470119-a3acdc43374a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
          },
          {
            "thumbnail_url": "https://images.unsplash.com/photo-1474494819794-90f9664b530d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
            "url": "https://images.unsplash.com/photo-1474494819794-90f9664b530d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80"
          },
          {
            "thumbnail_url": "https://images.unsplash.com/photo-1465877783223-4eba513e27c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
            "url": "https://images.unsplash.com/photo-1465877783223-4eba513e27c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
          },
          {
            "thumbnail_url": "https://images.unsplash.com/photo-1428790031246-698d71b6fe3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
            "url": "https://images.unsplash.com/photo-1428790031246-698d71b6fe3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
          },
          {
            "thumbnail_url": "https://images.unsplash.com/photo-1470282312847-28b943046dc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
            "url": "https://images.unsplash.com/photo-1470282312847-28b943046dc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1652&q=80"
          },
          {
            "thumbnail_url": "https://images.unsplash.com/photo-1428790067070-0ebf4418d9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
            "url": "https://images.unsplash.com/photo-1428790067070-0ebf4418d9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
          },
          {
            "thumbnail_url": "https://images.unsplash.com/photo-1451256656121-9ffc0c898a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
            "url": "https://images.unsplash.com/photo-1451256656121-9ffc0c898a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
          },
          {
            "thumbnail_url": "https://images.unsplash.com/photo-1524604519054-2365ac11e431?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
            "url": "https://images.unsplash.com/photo-1524604519054-2365ac11e431?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
          },
          {
            "thumbnail_url": "https://images.unsplash.com/photo-1541006008768-d181e7f9f3d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
            "url": "https://images.unsplash.com/photo-1541006008768-d181e7f9f3d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1568&q=80"
          },
          {
            "thumbnail_url": "https://images.unsplash.com/photo-1430390456011-25ac9244999c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
            "url": "https://images.unsplash.com/photo-1430390456011-25ac9244999c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
          }
        ],
        "skus": {
          "2580663": {
            "quantity": 14,
            "size": "7"
          },
          "2580664": {
            "quantity": 25,
            "size": "7.5"
          },
          "2580665": {
            "quantity": 9,
            "size": "8"
          },
          "2580666": {
            "quantity": 2,
            "size": "8.5"
          },
          "2580667": {
            "quantity": 18,
            "size": "9"
          },
          "2580668": {
            "quantity": 12,
            "size": "9.5"
          },
          "2580669": {
            "quantity": 10,
            "size": "10"
          },
          "2580670": {
            "quantity": 18,
            "size": "10.5"
          },
          "2580671": {
            "quantity": 11,
            "size": "11"
          },
          "2580672": {
            "quantity": 35,
            "size": "11.5"
          },
          "2580673": {
            "quantity": 25,
            "size": "12"
          }
        }
      }
    ]
    }/>)
    expect(screen.getByTestId('thumbnailContainerTest')).toBeInTheDocument();
  })

})