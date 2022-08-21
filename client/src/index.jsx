const React = require('react')
const ReactDOM = require('react-dom')
import axios from 'axios'

function App() {
  const getCurrentProduct = () => {
    return axios.get('/products')
      .then(results => {
        return results.data[4]
      })
  }
}

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        Hello From React
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))