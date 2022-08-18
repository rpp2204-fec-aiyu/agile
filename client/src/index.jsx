const React = require('react')
const ReactDOM = require('react-dom')
const QuesAns = require('./QuestionAnswer/QuesAns.jsx')

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <QuesAns />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))