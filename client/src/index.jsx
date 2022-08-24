// const React = require('react')
// const ReactDOM = require('react-dom')
// const QuesAns = require('./QuestionAnswer/QuesAns.jsx')
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import QuesAns from './QuestionAnswer/QuesAns.jsx'

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