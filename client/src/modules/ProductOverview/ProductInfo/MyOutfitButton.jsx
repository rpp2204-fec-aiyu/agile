import React from 'react'

export default class MyOutfitButton extends React.Component {

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
        <button onClick={this.handleClick} style={{margin: '3px', height: '50px', width: '50px', fontSize: '20px'}}>&#9733;</button> :
        <button onClick={this.handleClick} style={{margin: '3px', height: '50px', width: '50px', fontSize: '20px'}}>&#9734;</button> }
      </div>

    )
  }
}