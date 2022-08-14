import React from 'react'

export default class MyOutfit extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isClicked: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      isClicked: !this.state.isClicked
    })
  }

  render() {
    return (
      <div>
        {this.state.isClicked ?
        <button onClick={this.handleClick}>&#9733;</button> :
        <button onClick={this.handleClick}>&#9734;</button> }
      </div>

    )
  }
}