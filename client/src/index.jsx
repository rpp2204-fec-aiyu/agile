const React = require('react')
const ReactDOM = require('react-dom')
const axios = require('axios')
import ProductOverview from './modules/ProductOverview/ProductOverview.jsx'

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <ProductOverview />
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))