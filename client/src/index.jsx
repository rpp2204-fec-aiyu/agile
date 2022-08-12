const React = require('react')
const ReactDOM = require('react-dom')

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