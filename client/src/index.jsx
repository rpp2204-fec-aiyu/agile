import React from 'react'
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
        setCurrentProduct(product)
        setProductId(product.id)
      })
  }, [])



  if(!!product.id) {
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