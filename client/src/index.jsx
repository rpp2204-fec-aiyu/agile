const React = require('react')
const ReactDOM = require('react-dom')
const axios = require('axios')
import ProductOverview from './modules/ProductOverview/ProductOverview.jsx'

class App extends React.Component {
  constructor() {
    super()
  }

  // componentDidMount() {
  //   axios.get('http://localhost:3000/products')
  //     .then(results => {
  //       console.log(results.data)
  //     })
  // }

  render() {
    return (
      <ProductOverview />
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))